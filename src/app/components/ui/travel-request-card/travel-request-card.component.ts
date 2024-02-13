import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';

@Component({
  selector: 'app-travel-request-card',
  templateUrl: './travel-request-card.component.html',
  styleUrls: ['./travel-request-card.component.css']
})
export class TravelRequestCardComponent {

  @Input() data: any[] = []


  currentLoggedInUserRole: string;

  constructor(public bsModalRef: BsModalRef, private commonAPIService: CommonAPIService) {

    this.currentLoggedInUserRole = commonAPIService.currentLoggedInUserRole;

  }



}
