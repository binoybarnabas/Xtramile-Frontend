import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';

@Component({
  selector: 'app-travel-admin-home',
  templateUrl: './travel-admin-home.component.html',
  styleUrls: ['./travel-admin-home.component.css']
})
export class TravelAdminHomeComponent {
  
  employeeName!:string 
  designation!:string 
  userData : any

  constructor(private router : Router){}
  
  
  ngOnInit(){
    // Retrieve user data from sessionStorage
    const storedUserDataString = sessionStorage.getItem('travelAdminData');
    if (storedUserDataString) {
      this.userData = JSON.parse(storedUserDataString);
      this.employeeName = this.userData.employeeName;
      this.designation = this.userData.role;
    }
  }

    //logging out from the finance personnel module
    logout(message :string){
      console.log(message);
      //clearing the session.
      // const logoutData = Object.keys(sessionStorage);
      // Remove an item from session storage
      sessionStorage.removeItem('travelAdminData');
      sessionStorage.removeItem('isTravelAdminAuthenticated');
       this.router.navigate(['login']);
    }
  
}
