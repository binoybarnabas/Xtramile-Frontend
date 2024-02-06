import { Component } from '@angular/core';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';

@Component({
  selector: 'app-finance-personnel-home',
  templateUrl: './finance-personnel-home.component.html',
  styleUrls: ['./finance-personnel-home.component.css']
})
export class FinancePersonnelHomeComponent {

  employeeName!:string 
  designation!:string 
  userData : any

  
  ngOnInit(){
    // Retrieve user data from sessionStorage
    const storedUserDataString = sessionStorage.getItem('financePersonnelData');
    if (storedUserDataString) {
      this.userData = JSON.parse(storedUserDataString);
      this.employeeName = this.userData.employeeName;
      this.designation = this.userData.role;
    }
  }

}
