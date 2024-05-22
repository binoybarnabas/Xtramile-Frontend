import { Injectable, ViewChild } from '@angular/core';
import { CustomToastService } from '../toastServices/custom-toast.service';
import { TravelRequestApiService } from '../../apiServices/travelRequestAPIServices/travel-request-api.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TravelRequestUiService {
  
  constructor(
    public bsModalRef: BsModalRef,
    private travelRequestApiService: TravelRequestApiService,
    private toastService: CustomToastService,
    private router:Router
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

  sendTravelTickets(travelTicketFormData : any){

    this.travelRequestApiService.sendTravelTickets(travelTicketFormData).subscribe({
      next: (response) => {
        
        this.toastService.showToast({
          message: 'Travel Tickets Send',
          toastType: 'success',
          toastDuration: 3000,
        });

        this.router.navigate(['traveladmin/requests/approved'])

      },
      error:(error)=>{
        this.toastService.showToast({
          message: error.message,
          toastType: 'fail',
          toastDuration: 3000,
        });

        //this.router.navigate(['traveladmin/requests/approved'])

      },
      complete: () => {
        //this.bsModalRef.hide();
        //refresh manager incoming travel requests

      },
    })

  }

  rejectTravelRequest(rejectionFormData: any){

    this.travelRequestApiService.rejectTravelRequest(rejectionFormData).subscribe({
      next: (response) => {
        
        this.toastService.showToast({
          message: 'Travel Request Rejected',
          toastType: 'success',
          toastDuration: 3000,
        });

        this.router.navigate(['traveladmin/requests/approved'])

      },
      error:(error)=>{

        this.toastService.showToast({
          message: error.message,
          toastType: 'fail',
          toastDuration: 3000,
        });

      },
      complete: () => {
   
      }

    })
  }

  

}
