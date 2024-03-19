import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { TravelRequestDetailViewModel } from 'src/app/services/interfaces/iTravelRequestDetails';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { local } from 'd3';
import { DatePipe } from '@angular/common';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-travel-request-card-modal',
  templateUrl: './travel-request-card-modal.component.html',
  styleUrls: ['./travel-request-card-modal.component.css']
})
export class TravelRequestCardModalComponent {
  private _requestId!: number;
  primaryStatus: string = 'Denied';


  @Input()
  set requestId(value: number) {
    this._requestId = value;
    // console.log(this._requestId)
  }

  travelRequestDetailViewModel!: TravelRequestDetailViewModel

  constructor(public bsModalRef: BsModalRef, private router: Router, private commonApiService: CommonAPIService, private datePipe: DatePipe, private managerTravelRequest: ManagerTravelRequestsService
  ) {
  }


  ngOnInit() {

    this.commonApiService.GetTravelRequestById(this._requestId).subscribe({

      next: (data) => {
        this.travelRequestDetailViewModel = data;
        console.log(this.travelRequestDetailViewModel)
        console.log(this.travelRequestDetailViewModel.requestId)
      },
      error: (error: Error) => { console.log("problems in fetching data") },
      complete: () => { console.log("get request by id is done") }
    });

  }
  navigateHandleUserSelection() {
    const userData = localStorage.getItem('userData')
    if (userData) {
      const userDataParsed = JSON.parse(userData)

      if (userDataParsed.role == 'Manager' && userDataParsed.department == 'TA') {
        this.navigateToAddOptions();
      }
      else if (userDataParsed.role == 'Manager') {
        this.navigateToSetPriority();
      }
    }


  }

  //On Travel Click Proceed Button
  navigateToAddOptions() {
    const queryParams = { requestId: this._requestId }
    this.router.navigate(['traveladmin/requestdetail'], { queryParams: queryParams });
    this.bsModalRef.hide();
  }

  navigateToSetPriority() {
    const queryParams = { requestId: this._requestId }
    this.router.navigate(['manager/requestdetail'], { queryParams: queryParams });
    this.bsModalRef.hide();
  }

  //Manager forwarding the travel request form
  onManagerForwardTravelRequestForm() {
    //Should call a PATCH method to set priority of the request
    //console.log(this.travelRequestForm.value.priority);

    this.managerTravelRequest.setRequestPriorityAndApprove(this.travelRequestDetailViewModel.requestId).subscribe(
      {
        next: (data) => {
          console.log(data);
          // window.alert(this.travelRequestDetailViewModel.requestId + "  " + this.travelRequestForm.value.priority);
          //  console.log(this.travelRequestDetailViewModel.requestId + "  " + this.travelRequestForm.value.priority);
          // Redirect to another page
          //alert("Approved");
          this.router.navigate(['/manager/dashboard']);

        },
        complete: () => {
          //this.toastr.success('Request approved!', 'Success');
          // this.toastService.showToast("Travel Request Approved!")
        }
      }
    );
  }



}
