import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';

@Component({
  selector: 'app-employee-closed-requests',
  templateUrl: './employee-closed-requests.component.html',
  styleUrls: ['./employee-closed-requests.component.css']
})
export class EmployeeClosedRequestsComponent {

  constructor(private employeeService: RequestService) { }

  requestData = []

  empId = 17
  pageSize = 10;
  pageIndex = 1;
  totalCount = 0;
  currentPage = 1;
  tableHeaders = ['RequestId', 'ProjectCode', 'ProjectName', 'TravelType', 'ClosedDate', 'Status']
  dataHeaders = ['requestId', 'projectCode', 'projectName', 'travelType', 'closedDate', 'status']

  pageHeading: string = 'Travel History'

  ngOnInit() {
    this.fetchRequestHistory();
  }

  fetchRequestHistory() {
    this.employeeService.getEmployeeRequestHisory(this.empId, this.pageIndex, this.pageSize).subscribe(
      {
        next: (data) => {
          this.requestData = data.employeeRequest;
          this.totalCount = data.totalCount;
        },

        error: (error) => {
          console.log("error fetching closed requests: ", error)
        }
      });
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.fetchRequestHistory();
  }

}
