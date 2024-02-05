import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-travel-admin-selected-options-travel-requests',
  templateUrl: './travel-admin-selected-options-travel-requests.component.html',
  styleUrls: ['./travel-admin-selected-options-travel-requests.component.css']
})
export class TravelAdminSelectedOptionsTravelRequestsComponent {
  
  private subscription : Subscription | any

  tableHeaders: string[] = ['Request ID', 'Employee', 'Project Code', 'Date','Mode','Priority'];
  fieldsToDisplay: string[] = ['requestId', 'employeeName', 'projectCode','createdOn','travelTypeName','priorityName'];
  incomingRequestdata:any[] = [];

  constructor(private travelAdminTravelRequestService: TravelAdminTravelRequestsService, private datePipe : DatePipe) {}

  ngOnInit(){
    this.subscription = this.travelAdminTravelRequestService.getWaitingOrSelectedRequests('SD').subscribe({
      next: (data) => {
        data.forEach((request) => {
          request.createdOn = this.datePipe.transform(request.createdOn, 'dd/LL/yyy') || '';
        });
        this.incomingRequestdata = data;        
      },
      error: (error: Error) => {
        console.log("Error while fetching requests")
        console.log(error.message)
      },
      complete: () => {
        console.log("Requests fetching completed")
      }
    })
  }
}
