import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { PendingRequest } from './pending-request';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserData } from 'src/app/services/interfaces/iuserData';

@Component({
  selector: 'app-employee-pending-requests',
  templateUrl: './employee-pending-requests.component.html',
  styleUrls: ['./employee-pending-requests.component.css']
})
export class EmployeePendingRequestsComponent {
  private subscription: Subscription | any;
  titles: string[] = ['Request Id', 'Status', 'Project Name', 'Reason for travel', 'Start Date', 'Destination']
  requestData: PendingRequest[] = [];
  empId: number;
  userData: UserData


  constructor(private requestService: RequestService, private router: Router, private activatedRoute: ActivatedRoute, private datepipe: DatePipe) {
    const storedUserData = localStorage.getItem('userData');
    this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;
    this.empId = this.userData?.empId

  }

  ngOnInit() {
    this.getRequests(this.empId);
  }

  //function to get the requests that have status pending for employee screen
  getRequests(empId: number) {
    this.subscription = this.requestService.getRequestsPendingStatus(empId).subscribe({
      next: (data) => {
        // Fetch status name for each request
        console.log("Data" + data[0].requestId)
        data.forEach((request) => {
          this.requestService.getStatusName(request.requestId).subscribe({
            next: (statusName) => {
              // Store the status name in the request object

              request.statusName = statusName;
            },
            error: (error: Error) => {
              console.log(`Error fetching status name for request ${request.requestId}: ${error.message}`);
            },
          });
          // Format the date to show only the date part
          request.dateOfTravel = this.datepipe.transform(request.dateOfTravel, 'dd/LL/yyyy') || '';
        });

        // Update the component's requestData array
        this.requestData = data;

        console.log("REq" + this.requestData[0].statusName);

      },
      error: (error: Error) => {
        console.log("Error has occurred, " + error.message);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }

  navigateToOption(requestId: number) {
    console.log("Clicked")
    this.router.navigate(['available_options'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: { requestId: requestId }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}



