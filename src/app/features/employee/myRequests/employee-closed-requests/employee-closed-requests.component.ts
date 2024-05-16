import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';

@Component({
  selector: 'app-employee-closed-requests',
  templateUrl: './employee-closed-requests.component.html',
  styleUrls: ['./employee-closed-requests.component.css']
})
export class EmployeeClosedRequestsComponent {

  constructor(private employeeService: RequestService, private datepipe: DatePipe) { }

  requestData = []

  empId: number = 0
  pageSize = 10;
  pageIndex = 1;
  totalCount = 0;
  currentPage = 1;
  tableHeaders = ['Request Code', 'Project Code', 'From', 'To', 'Requested On', 'Closed On', 'Status']
  dataHeaders = ['requestCode', 'projectCode', 'from', 'to', 'requestedOn', 'closedOn', 'status']

  pageHeading: string = 'Travel History'

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if(userData){
      const userDataParsed = JSON.parse(userData);
      this.empId = userDataParsed.empId
    }
    this.fetchRequestHistory();
  }

  fetchRequestHistory() {
    this.employeeService.getEmployeeRequestHisory(this.empId, this.pageIndex, this.pageSize).subscribe(
      {
        next: (data) => {
          data.employeeRequest.forEach((request: any) => {
            request.requestedOn = this.datepipe.transform(request.requestedOn, "dd/MM/yyyy"),
            request.closedOn = this.datepipe.transform(request.closedOn, "dd/MM/yyyy")
          })
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
