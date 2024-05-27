import { Injectable, ViewChild } from '@angular/core';
import { CustomToastService } from '../toastServices/custom-toast.service';
import { TravelRequestApiService } from '../../apiServices/travelRequestAPIServices/travel-request-api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CustomConfirmationModalComponent } from 'src/app/components/ui/generalUIComponents/custom-confirmation-modal/custom-confirmation-modal.component';
import { UserData } from 'src/app/models/interfaces/iuserData';

@Injectable({
  providedIn: 'root',
})
export class TravelRequestUiService {
  currentLoggedInUserId: number;

  userData: UserData;

  constructor(
    public bsModalRef: BsModalRef,
    private travelRequestApiService: TravelRequestApiService,
    private toastService: CustomToastService,
    private router: Router,
    private modalService: BsModalService
  ) {
    const storedUserData = localStorage.getItem('userData');

    this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;

    this.currentLoggedInUserId = this.userData?.empId;
  }

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

  sendTravelTickets(travelTicketFormData: any) {
    this.travelRequestApiService
      .sendTravelTickets(travelTicketFormData)
      .subscribe({
        next: (response) => {
          this.toastService.showToast({
            message: 'Travel Tickets Send',
            toastType: 'success',
            toastDuration: 3000,
          });

          this.router.navigate(['traveladmin/requests/approved']);
        },
        error: (error) => {
          this.toastService.showToast({
            message: error.message,
            toastType: 'fail',
            toastDuration: 6000,
          });

          //this.router.navigate(['traveladmin/requests/approved'])
        },
        complete: () => {
          //this.bsModalRef.hide();
          //refresh manager incoming travel requests
        },
      });
  }

  openRejectionConfirmationModal(requestId: number) {
    const initialState = {
      requestid: requestId,
      mainText: 'Reject Travel Request?',
      description: 'Kindly specify the reason for declining the travel request',
      cancelBtnText: 'Cancel',
      confirmBtnText: 'Reject',
      confirmBtnColor: '#ec0d0d',
      isTextFieldEnabled: true,
      textFieldLabel: 'Reason for Rejection',
      textFieldPlaceHolder: 'enter the reason',

      onRejectionReasonEntered: this.rejectTravelRequest.bind(this),
    };

    const modalRef = this.modalService.show(CustomConfirmationModalComponent, {
      initialState,
    });

    modalRef.content?.cancel.subscribe(() => {});
  }

  rejectTravelRequest(reasonForRejection: string, requestId: number) {
    const rejectionFormData = new FormData();

    rejectionFormData.append('requestId', String(requestId));

    rejectionFormData.append('rejectedBy', String(this.currentLoggedInUserId));

    rejectionFormData.append('rejectionReason', String(reasonForRejection));

    //this.travelRequestUIService.rejectTravelRequest(rejectionFormData);

    this.travelRequestApiService
      .rejectTravelRequest(rejectionFormData)
      .subscribe({
        next: (response) => {
          this.toastService.showToast({
            message: 'Travel Request Rejected',
            toastType: 'success',
            toastDuration: 3000,
          });

          this.router.navigate(['traveladmin/requests/approved']);
        },
        error: (error) => {
          this.toastService.showToast({
            message: error.message,
            toastType: 'fail',
            toastDuration: 3000,
          });
        },
        complete: () => {},
      });
  }
}
