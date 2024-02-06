import { Component } from '@angular/core';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent {

  employeeName!:string 
  designation!:string 
  userData : any

  ngOnInit(){
    // Retrieve user data from sessionStorage
    const storedUserDataString = sessionStorage.getItem('managerData');
    if (storedUserDataString) {
      this.userData = JSON.parse(storedUserDataString);
      this.employeeName = this.userData.employeeName;
      this.designation = this.userData.role;
    }
  }


}
