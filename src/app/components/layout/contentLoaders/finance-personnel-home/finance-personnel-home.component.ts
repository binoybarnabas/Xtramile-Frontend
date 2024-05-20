import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-finance-personnel-home',
  templateUrl: './finance-personnel-home.component.html',
  styleUrls: ['./finance-personnel-home.component.css']
})
export class FinancePersonnelHomeComponent {

  employeeName!:string 
  designation!:string 
  userData : any

  constructor(private loginService:LoginService,private router:Router){

  }
  
  ngOnInit(){
    // Retrieve user data from sessionStorage
    const storedUserDataString = localStorage.getItem('userData');
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
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('JwtToken')
     this.router.navigate(['login']);
  }

}
