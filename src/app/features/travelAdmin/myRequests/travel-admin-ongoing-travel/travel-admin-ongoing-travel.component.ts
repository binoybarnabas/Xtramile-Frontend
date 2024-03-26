import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-travel-admin-ongoing-travel',
  templateUrl: './travel-admin-ongoing-travel.component.html',
  styleUrls: ['./travel-admin-ongoing-travel.component.css']
})
export class TravelAdminOngoingTravelComponent {

  pageHeading: string = 'Ongoing Travel'
  constructor() {
  
    }

    getOngoingRequests(){
    
    }
  
}
