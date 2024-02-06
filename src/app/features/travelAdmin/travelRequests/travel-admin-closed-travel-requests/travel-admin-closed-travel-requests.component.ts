import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-travel-admin-closed-travel-requests',
  templateUrl: './travel-admin-closed-travel-requests.component.html',
  styleUrls: ['./travel-admin-closed-travel-requests.component.css']
})
export class TravelAdminClosedTravelRequestsComponent {
  private subscription : Subscription | any
  tableHeaders: string[] = ['Request ID', 'Employee', 'Project Code', 'Closed Date','Mode','Priority'];
  fieldsToDisplay: string[] = ['requestId', 'employeeName', 'projectCode','approvalDate','travelTypeName','priorityName'];
  incomingRequestdata:any[] = [];

  constructor(private travelAdminTravelRequestService: TravelAdminTravelRequestsService, 
    private datePipe : DatePipe, 
    private router: Router,) {}
  ngOnInit(){
    this.subscription = this.travelAdminTravelRequestService.getWaitingOrSelectedRequests('CL').subscribe({
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
  selectedRow($event: any) {
    throw new Error('Method not implemented.');
  }
}
