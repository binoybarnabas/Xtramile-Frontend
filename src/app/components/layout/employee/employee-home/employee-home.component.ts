import { Component, NgModule } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})

export class EmployeeHomeComponent {

  subscription: any;
  router: any;
  requestData = new Map();

  employeeName!:string 
  designation!:string 
  userData : any

  
  ngOnInit(){
    // Retrieve user data from sessionStorage
    const storedUserDataString = sessionStorage.getItem('employeeData');
    if (storedUserDataString) {
      this.userData = JSON.parse(storedUserDataString);
      this.employeeName = this.userData.employeeName;
      this.designation = this.userData.role;
    }
  }


  ngOnDestroy() {
    this.subscription.unSubscribe();
    console.log("UNSUBSCRIBED")
  }

  form!: FormGroup;

  onSubmit() {
    console.log(this.form)
    //  this.postData(this.form.value);
  }



}
