import { Component } from '@angular/core';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manager-ongoing-travel-requests',
  templateUrl: './manager-ongoing-travel-requests.component.html',
  styleUrls: ['./manager-ongoing-travel-requests.component.css']
})
export class ManagerOngoingTravelRequestsComponent {
  tableHeaders: string[] = ['Request ID', 'Employee', 'Project Code', 'Date','Mode','Priority','Status'];
  fieldsToDisplay: string[] = ['requestId', 'employeeNameAndEmail', 'projectCode','createdOn','travelTypeName','priorityName','statusName'];
  incomingRequestdata:any[] = [];
  managerId!: number; 
  constructor(private apiservice: ManagerTravelRequestsService){
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.managerId = parsedUserData.empId;
    }
  }
 
  ngOnInit() {
    //get employee ongoing data such as requestId, employeeNameAndEmail, projectCode, createdOn, travelTypeName, priorityName, statusName
    this.apiservice.getManagerOngoingTravelRequest(this.managerId).subscribe((data: any[]) => {
      this.incomingRequestdata = this.formatData(data);
    });
  }
  
  formatData(data: any[]): any[] {
    //using DatePipe to convert the date into dd/LL/yyyy format
    const datePipe = new DatePipe('en-US');
      return data.map(item => ({
        ...item,
        createdOn: datePipe.transform(item.createdOn, 'dd/LL/yyyy'),
        //concatinating the employeeName and employeeemail, we can split the data using \n
        //this is to show two data in a single cell,
        employeeNameAndEmail: `${item.employeeName}\n${item.employeeEmail}`
      }));
  }
}
