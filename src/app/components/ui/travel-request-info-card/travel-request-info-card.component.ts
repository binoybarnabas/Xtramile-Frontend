import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { TravelRequestDetailViewModel } from 'src/app/services/interfaces/iTravelRequestDetails';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { CustomToastService } from 'src/app/services/toastServices/custom-toast.service';

@Component({
  selector: 'app-travel-request-info-card',
  templateUrl: './travel-request-info-card.component.html',
  styleUrls: ['./travel-request-info-card.component.css']
})
export class TravelRequestInfoCardComponent {
  
  private _requestId!: number;
  primaryStatus: string = 'Denied';

  status: string = '';

  @Input()
  set requestId(value: number) {
    this._requestId = value;
  }

  travelRequestDetailViewModel!: TravelRequestDetailViewModel;

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private commonApiService: CommonAPIService,
    private managerTravelRequest: ManagerTravelRequestsService,
    private requestService: RequestService,
    private toastService:CustomToastService
  ) {}

  ngOnInit() {
    this.commonApiService.GetTravelRequestById(this._requestId).subscribe({
      next: (data) => {
        this.travelRequestDetailViewModel = data;
      },
      error: (error: Error) => {
        console.log('problems in fetching data');
      },
      complete: () => {
        console.log('get request by id is done');
      },
    });

    this.requestService.getStatusName(this._requestId).subscribe({
      next: (data) => {
        console.log(this._requestId);
        console.log(data);
        this.status = data;
        console.log(this.status);
      },
      complete: () => {},
    });
  }

  navigateHandleUserSelection() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userDataParsed = JSON.parse(userData);

      if (
        userDataParsed.role == 'Manager' &&
        userDataParsed.department == 'TA'
      ) {
        this.navigateToAddOptions();
      } else if (userDataParsed.role == 'Manager') {
        this.navigateToSetPriority();
      }
    }
  }

  //On Travel Click Proceed Button
  navigateToAddOptions() {
    const queryParams = { requestId: this._requestId };
      this.router.navigate(['traveladmin/requestdetail'], {
        queryParams: queryParams,
    });
    this.bsModalRef.hide();
  }

  navigateToSetPriority() {
    const queryParams = { requestId: this._requestId };
    this.router.navigate(['manager/requestdetail'], {
      queryParams: queryParams,
    });
    this.bsModalRef.hide();
  }

  //Manager forwarding the travel request form
  onManagerForwardTravelRequestForm() {
      //Should call a PATCH method to set priority of the request
      //console.log(this.travelRequestForm.value.priority);
  
      this.managerTravelRequest
        .setRequestPriorityAndApprove(this.travelRequestDetailViewModel.requestId)
        .subscribe({
          next: (data) => {
            console.log(data);
         
            this.toastService.showToast({ message: "Travel Request Approved", toastType: "success", toastDuration: 3000 });
            this.router.navigate(['/manager/dashboard']);
          },
          complete: () => {
            this.bsModalRef.hide();
          },
        });
  }
  
  onProceedButtonClick() {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const userDataParsed = JSON.parse(userData);
  
        if (
          userDataParsed.role == 'Manager' &&
          userDataParsed.department == 'TA'
        ) {
          this.navigateToAddOptions();
        } else if (userDataParsed.role == 'Manager') {
          this.onManagerForwardTravelRequestForm();
        }
      }
  }

}
