import { Component, Input, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonAPIService } from 'src/app/services/apiServices/commonAPIServices/common-api.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { CustomToastService } from 'src/app/services/helperServices/toastServices/custom-toast.service';
import { RejectionCardComponent } from '../rejection-card/rejection-card.component';

@Component({
  selector: 'app-travel-request-card',
  templateUrl: './travel-request-card.component.html',
  styleUrls: ['./travel-request-card.component.css']
})
export class TravelRequestCardComponent implements OnDestroy {

  @Input() data: any[] = [];

  statusChangeUser!: string;
  currentLoggedInUserRole: string;
  private unsubscribe$ = new Subject<void>();

  constructor(public bsModalRef: BsModalRef, private commonAPIService: CommonAPIService,
    private requestService: RequestService, private modalService: BsModalService, private toastService: CustomToastService) {

    this.currentLoggedInUserRole = commonAPIService.currentLoggedInUserRole;
    console.log(this.currentLoggedInUserRole);
  }

  cancelRequest(requestId: number) {
    console.log(this.currentLoggedInUserRole);
    if (this.currentLoggedInUserRole === 'employee') {
      this.bsModalRef = this.modalService.show(ConfirmationModalComponent);
      this.bsModalRef.content.confirmed.pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.requestService.employeeCancelRequest(requestId).pipe(
            catchError(error => {
              console.log(error);
              return throwError(error);
            }),
            takeUntil(this.unsubscribe$)
          ).subscribe({
            next: (data) => {
              console.log(data);
              console.log("success");
            },
            complete: () => {
              console.log("done");
              this.toastService.showToast({ message: "Travel Request Cancelled", toastType: "success", toastDuration: 3000 });
            }
          });
        }
      });
    }
    else if (this.currentLoggedInUserRole === 'manager') {
      // Handle manager role logic
    }
  }

  viewTravelOptions(requestId: number) {
    this.commonAPIService.getRequestReason(requestId).pipe(
      catchError(error => {
        console.error('Error fetching request reason:', error);
        return throwError(error);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (data) => {
        this.bsModalRef = this.modalService.show(RejectionCardComponent, {
          initialState: {
            message: data,
            requestId: requestId,
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
