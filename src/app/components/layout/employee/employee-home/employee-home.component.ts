import { Component, NgModule } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})

export class EmployeeHomeComponent {

  subscription: any;
  requestData = new Map();

  employeeName!:string 
  designation!:string 
  userData : any

  constructor(private router:Router){}

  ngOnInit(){
    // Retrieve user data from sessionStorage
    const storedUserDataString = localStorage.getItem('userData');
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

    //logging out from the employee module
    logout(message :string){
      console.log(message);
      //clearing the session.
      // const logoutData = Object.keys(sessionStorage);
      // Remove an item from session storage
      localStorage.removeItem('userData');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('JwtToken')
      this.router.navigate(['login']);
    }


}
