import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-travel-request-card',
  templateUrl: './travel-request-card.component.html',
  styleUrls: ['./travel-request-card.component.css']
})
export class TravelRequestCardComponent {

  @Input() data: any[] = []


  currentLoggedInUserRole: string;

  constructor(public bsModalRef: BsModalRef, private commonAPIService: CommonAPIService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.currentLoggedInUserRole = commonAPIService.currentLoggedInUserRole;

  }


  //View Travel Options send by travel admin
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
