import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-description-modal',
  templateUrl: './description-modal.component.html',
  styleUrls: ['./description-modal.component.css']
})
export class DescriptionModalComponent {
  optionForm: FormGroup;
  @Input()requestId:number = 3;
  empId:number = 9;
  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder,private apiservice:ManagerTravelRequestsService){
    this.optionForm = this.formBuilder.group({
      description: ['',Validators.required]
    
  })
}
closeModal() {
  this.bsModalRef.hide();
}
submitModal() {
  if(this.optionForm.valid){
    const descriptionData = this.optionForm.get('description')?.value;
    this.apiservice.postReasonToCancel(this.requestId,this.empId,descriptionData).subscribe({
      next: (response) =>{
        console.log('Data posted successfully', response);
          // You can handle success here
          this.bsModalRef.hide();
      },
      error: (error) =>{
        console.error('Error posting data', error);
      },
      complete:() =>{
        console.log('Post request completed.');
      }
    })
  } 
}
}
