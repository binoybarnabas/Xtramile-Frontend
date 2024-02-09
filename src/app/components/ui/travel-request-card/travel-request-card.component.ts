import { Component } from '@angular/core';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';

@Component({
  selector: 'app-travel-request-card',
  templateUrl: './travel-request-card.component.html',
  styleUrls: ['./travel-request-card.component.css']
})
export class TravelRequestCardComponent {


  currentLoggedInUserRole: string;

  constructor(private commonAPIService: CommonAPIService) {

    this.currentLoggedInUserRole = commonAPIService.currentLoggedInUserRole;

  }

}
