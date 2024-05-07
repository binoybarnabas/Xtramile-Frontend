import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-ongoing-requests',
  templateUrl: './employee-ongoing-requests.component.html',
  styleUrls: ['./employee-ongoing-requests.component.css']
})
export class EmployeeOngoingRequestsComponent {

  tableHeaders: string[] = ['Request Code', 'Project Code', 'Project Name', 'Start Date', 'End Date', 'Reason', 'Status'];
  fieldsToDisplay: string[] = ['requestCode', 'projectCode', 'projectName', 'startDate', 'endDate', 'reason', 'statusName'];
  incomingRequestdata: any[] = [];

  constructor(private apiservice: RequestService) { }

  userData = localStorage.getItem('userData');
  parsedUserData = this.userData ? JSON.parse(this.userData) : ''

  employeeId: number = this.parsedUserData.empId;

  pageHeading: string = 'Ongoing Travel'

  currentPage: number = 1;

  itemsPerPage: number = 10;

  totalCount: number = 0;

  ngOnInit() {
    this.getOngoingRequests();
  }

  getOngoingRequests(){
    this.apiservice.getEmployeeOngoingRequest(this.employeeId, this.currentPage, this.itemsPerPage).subscribe((data) => {
      this.incomingRequestdata = this.formatData(data.items);
      this.totalCount = data.totalCount;
    });
  }

  formatData(data: any[]): any[] {
    //using DatePipe to convert the date into dd/LL/yyyy format
    const datePipe = new DatePipe('en-US');
    return data.map(item => ({
      ...item,
      startDate: datePipe.transform(item.startDate, 'dd/LL/yyyy'),
      endDate: datePipe.transform(item.endDate, 'dd/LL/yyyy')
    }));
  }

  onPageChange(event:any){
    this.currentPage = event.page;
    this.getOngoingRequests();
  }
}
