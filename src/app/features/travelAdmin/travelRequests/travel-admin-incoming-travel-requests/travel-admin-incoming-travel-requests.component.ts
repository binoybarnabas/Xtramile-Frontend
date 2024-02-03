import { Component } from '@angular/core';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-travel-admin-incoming-travel-requests',
  templateUrl: './travel-admin-incoming-travel-requests.component.html',
  styleUrls: ['./travel-admin-incoming-travel-requests.component.css']
})
export class TravelAdminIncomingTravelRequestsComponent {
  tableHeaders: string[] = ['Request ID', 'Employee', 'Project Code', 'Date','Mode','Priority','Status'];
  fieldsToDisplay: string[] = ['requestId', 'employeeName', 'projectCode','createdOn','travelTypeName','priorityName','statusName'];
  incomingRequestdata:any[] = [];
  constructor(private apiservice: TravelAdminTravelRequestsService){
    
  }
  ngOnInit(){
    this.apiservice.getIncomingRequests().subscribe((data: any[]) => {
      this.incomingRequestdata = data;
    });
  }
}
