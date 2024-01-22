import { Component } from '@angular/core';
import { EmployeeServiceService } from 'src/app/services/employeeServices/employee-service.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  SublistData = ["General information","Trip information","Additional Information"];
  EmployeeRequestRoutes = ['user/info','user/tripinfo','user/otherinfo'];
  employeeData:any
  constructor(private employeeService:EmployeeServiceService ) {

  }
 EmployeeData:any
  ngOnInit(){
  this.EmployeeData = this.getEmployeeData();
  }
  
  getEmployeeData(){
    this.employeeService.getEmployeeData(6).subscribe({
      next:(data)=>{
        console.log(data);
        return data
      }
     ,
      error:(error:Error)=>{
        alert("an error occured" + error)
      }
    ,
    complete:()=>{
      console.log("completed the employee data fetching...");
    }
    })
  }
}
