import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { PendingRequest } from './pending-request';

@Component({
  selector: 'app-employee-pending-requests',
  templateUrl: './employee-pending-requests.component.html',
  styleUrls: ['./employee-pending-requests.component.css']
})
export class EmployeePendingRequestsComponent {
    private subscription: Subscription | any;
    requestData : PendingRequest[] = [];
      empId: number = 15;

  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.getRequests(this.empId);
  }

  getRequests(empId: number) {
    this.subscription = this.requestService.getRequestsPendingStatus(empId).subscribe({
      next: (data) => {
        console.log(data);
        this.requestData = data;
      },
      error: (error: Error) => {
        console.log("Error has occurred, " + error.message);
      },
      complete: () => {
        console.log("Completed");
      }      
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
