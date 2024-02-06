import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-travel-admin-ongoing-travel-requests',
  templateUrl: './travel-admin-ongoing-travel-requests.component.html',
  styleUrls: ['./travel-admin-ongoing-travel-requests.component.css']
})
export class TravelAdminOngoingTravelRequestsComponent {

  tableHeaders: string[] = ['Request ID', 'Employee', 'Project Code', 'Project Name','Source City','Destination City'];
  fieldsToDisplay: string[] = ['requestId','name', 'projectCode', 'projectName','sourceCity','destinationCity'];
  ongoingRequestData:any[] = [];
  constructor(private apiservice: TravelAdminTravelRequestsService){
  }
  
  ngOnInit(){
    console.log('hel')
    this.apiservice.getOngoingTravelRequest().subscribe((data: any[]) => {
      this.ongoingRequestData = data;
      console.log(this.ongoingRequestData)
    });
  }

  selectedRow($event: any) {
    throw new Error('Method not implemented.');
  }
}
