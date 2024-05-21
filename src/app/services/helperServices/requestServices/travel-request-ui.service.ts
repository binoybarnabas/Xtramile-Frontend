import { Injectable, ViewChild } from '@angular/core';
import { ManagerTravelRequestsService } from '../../managerServices/travelRequestsServices/manager-travel-requests.service';
import { CustomToastService } from '../toastServices/custom-toast.service';
import { TravelRequestApiService } from '../../apiServices/travelRequestAPIServices/travel-request-api.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ManagerIncomingTravelRequestsComponent } from 'src/app/features/manager/travelRequests/manager-incoming-travel-requests/manager-incoming-travel-requests.component';

@Injectable({
  providedIn: 'root',
})
export class TravelRequestUiService {
  
  constructor(
    public bsModalRef: BsModalRef,
    private travelRequestApiService: TravelRequestApiService,
    private toastService: CustomToastService
  ) {}

  //Manager forwarding the travel request form
  onManagerForwardTravelRequestForm(requestId: number, managerId: number) {
    this.travelRequestApiService
      .forwardTravelRequestToTravelAdmin(requestId, managerId)
      .subscribe({
        next: (data) => {
          console.log(data);

          this.toastService.showToast({
            message: 'Travel Request Forwarded',
            toastType: 'success',
            toastDuration: 3000,
          });
        },
        complete: () => {
          //this.bsModalRef.hide();
          //refresh manager incoming travel requests

        },
      });
  }
}
