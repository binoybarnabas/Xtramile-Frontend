import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-description-modal',
  templateUrl: './description-modal.component.html',
  styleUrls: ['./description-modal.component.css']
})
export class DescriptionModalComponent {
  @Input()
  set requestId(value: number) {
    this._requestId = value;
  if (this.optionForm) {
    this.optionForm.get('requestId')?.setValue(value);
    }
  }
  get requestId(): number {
    return this._requestId;
  }
  private _requestId!: number;
  optionForm: FormGroup;
  empId:number = 9;
  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder,private apiservice:ManagerTravelRequestsService,private route: ActivatedRoute,private router: Router){
    this.optionForm = this.formBuilder.group({
      description: ['',Validators.required]
    
  })
}
ngOnInit(){
  console.log(this.requestId)
}
closeModal() {
  console.log(this.requestId)
  this.bsModalRef.hide();
}
submitModal() {
  if(this.optionForm.valid){
    const descriptionData = this.optionForm.get('description')?.value;
    this.apiservice.postReasonToCancel(this.requestId,this.empId,descriptionData).subscribe({
      next: (response) =>{
        console.log('Data posted successfully', response);
          // You can handle success here
          alert('Reason for denial has been submitted')
          this.bsModalRef.hide();
      },
      error: (error) =>{
        console.error('Error posting data', error);
      },
      complete:() =>{
        console.log('Post request completed.');
      }
    })
    this.apiservice.cancelRequest(this.requestId).subscribe(
      {
        next: (data) => {
          console.log(data);
          alert('Denial Reason has been sent')
          // Redirect to another page
          this.router.navigate(['/manager/dashboard']);
        },
        complete: () => {
          //this.toastr.warning('Request Rejected!', 'Warning');
        }
      })

  }
}
}
