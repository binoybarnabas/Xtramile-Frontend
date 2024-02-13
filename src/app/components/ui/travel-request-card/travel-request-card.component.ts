import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-travel-request-card',
  templateUrl: './travel-request-card.component.html',
  styleUrls: ['./travel-request-card.component.css']
})
export class TravelRequestCardComponent {

  @Input() data: any[] = []

  statusChangeUser!: string
  currentLoggedInUserRole: string;
  bsModalRef!: BsModalRef;


  constructor(private commonAPIService: CommonAPIService, private router: Router, private activatedRoute: ActivatedRoute,
    private requestService: RequestService,private modalService: BsModalService) {

    this.currentLoggedInUserRole = commonAPIService.currentLoggedInUserRole;
  }


  cancelRequest(requestId: number) {
    console.log(this.currentLoggedInUserRole);
    if(this.currentLoggedInUserRole === 'employee'){
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
            }
          });
        }
      });
    }
    else if (this.currentLoggedInUserRole == 'manager') {

    }
  }  //View Travel Options send by travel admin
  viewTravelOptions(requestId: number) {

    const queryParams = { requestId: requestId }

    // this.router.navigate(['employee/viewtraveloptions'], { queryParams: queryParams });
    this.router.navigate(['view_travel_options'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: { requestId: requestId }
    })

    //this.bsModalRef.hide();

  }



}
