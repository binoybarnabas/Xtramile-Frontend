import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';

@Component({
  selector: 'app-employee-closed-requests',
  templateUrl: './employee-closed-requests.component.html',
  styleUrls: ['./employee-closed-requests.component.css']
})
export class EmployeeClosedRequestsComponent {

  empId= 17

  constructor(private employeeService : RequestService){}

  requestData: any =[]
  
  table_headers=['RequestId','ProjectCode','ProjectName','TravelType','ClosedDate','Status']
  fetchRequestHistory(){
  }

}
