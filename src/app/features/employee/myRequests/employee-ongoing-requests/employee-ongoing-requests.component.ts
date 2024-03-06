import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-ongoing-requests',
  templateUrl: './employee-ongoing-requests.component.html',
  styleUrls: ['./employee-ongoing-requests.component.css']
})
export class EmployeeOngoingRequestsComponent {

  tableHeaders: string[] = ['Request ID', 'Project Code', 'ProjectName', 'Start Date', 'End Date', 'Reason', 'Status'];
  fieldsToDisplay: string[] = ['requestId', 'projectCode', 'projectName', 'startDate', 'endDate', 'reason', 'statusName'];
  incomingRequestdata: any[] = [];

  constructor(private apiservice: RequestService) { }
  employeeId: number = 3;

  pageHeading: string = 'Ongoing Travel'

  ngOnInit() {
    //get employee ongoing data such as requestId, projectCode, projectName, startDate, endDate, reason, statusName
    this.apiservice.getEmployeeOngoingRequest(this.employeeId).subscribe((data: any[]) => {
      this.incomingRequestdata = this.formatData(data);
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
}
