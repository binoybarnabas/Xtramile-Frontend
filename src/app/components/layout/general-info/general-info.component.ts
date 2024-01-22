import { Component } from '@angular/core';
import { EmployeeServiceService } from 'src/app/services/employeeServices/employee-service.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent {
 

  LeftTextFields = ["First Name","Phone","Address line 1","Department","Project Name"]
  RightTextFields = ["Last Name","Email","Address line 2","Project ID","Reports To"]
 
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
