import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';

import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { CustomToastService } from 'src/app/services/toastServices/custom-toast.service';
import { RejectionCardComponent } from '../rejection-card/rejection-card.component';

@Component({
  selector: 'app-travel-request-card',
  templateUrl: './travel-request-card.component.html',
  styleUrls: ['./travel-request-card.component.css']
})
export class TravelRequestCardComponent {

  @Input() data: any[] = []

  statusChangeUser!: string
  currentLoggedInUserRole: string;

  constructor(public bsModalRef: BsModalRef, private commonAPIService: CommonAPIService,
    private requestService: RequestService, private modalService: BsModalService, private toastService: CustomToastService) {

    this.currentLoggedInUserRole = commonAPIService.currentLoggedInUserRole;
    console.log(this.currentLoggedInUserRole)
  }


  cancelRequest(requestId: number) {
    console.log(this.currentLoggedInUserRole);
    if (this.currentLoggedInUserRole === 'employee') {
      this.bsModalRef = this.modalService.show(ConfirmationModalComponent);
      this.bsModalRef.content.confirmed.subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.requestService.employeeCancelRequest(requestId).subscribe({
            next: (data) => {
              console.log(data);
              console.log("success");
            },
            error: (error: Error) => {
              console.log(error);
            },
            complete: () => {
              console.log("done");
              this.toastService.showToast("Travel Request Cancelled!")
            }
          });
        }
      });
    }
    else if (this.currentLoggedInUserRole == 'manager') {

    }
  }  
 
  viewTravelOptions(requestId: number) {
    this.commonAPIService.getRequestReason(requestId).subscribe({
      next: (data) => {
        this.bsModalRef = this.modalService.show(RejectionCardComponent, {
          initialState: {
            message: data, 
          }
        });
      },
      error: (error) => {
        console.error('Error fetching request reason:', error);
      }
    });
  }
  
}
