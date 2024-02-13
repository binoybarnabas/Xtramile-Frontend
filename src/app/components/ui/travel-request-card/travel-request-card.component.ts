import { Component, Input } from '@angular/core';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';

@Component({
  selector: 'app-travel-request-card',
  templateUrl: './travel-request-card.component.html',
  styleUrls: ['./travel-request-card.component.css']
})
export class TravelRequestCardComponent {

  @Input() data: any[] = []

  statusChangeUser! : string
  currentLoggedInUserRole: string;

  constructor(private commonAPIService: CommonAPIService) {

    this.currentLoggedInUserRole = commonAPIService.currentLoggedInUserRole;
  }





}
