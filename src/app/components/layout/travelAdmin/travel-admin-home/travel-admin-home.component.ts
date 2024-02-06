import { Component } from '@angular/core';
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

  
  ngOnInit(){
    // Retrieve user data from sessionStorage
    const storedUserDataString = sessionStorage.getItem('travelAdminData');
    if (storedUserDataString) {
      this.userData = JSON.parse(storedUserDataString);
      this.employeeName = this.userData.employeeName;
      this.designation = this.userData.role;
    }
  }

}
