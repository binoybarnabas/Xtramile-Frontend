import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/loginService/login.service';
import { CredentialData } from './Credential';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  isLoading: boolean = false;
  invalidCredentials: boolean = false;
  loginForm!:FormGroup

  ngOnInit(){
  this.loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
   // Subscribe to form value changes
   this.loginForm.valueChanges.subscribe((value) => {
    console.log('Form values:', value);
  });

  //to check whether the user already authenticated is true then skip the login and redirect to the page
  if(Boolean(sessionStorage.getItem('isEmployeeAuthenticated'))){
    this.router.navigate(['employee/dashboard']);
  }

  if(Boolean(sessionStorage.getItem('isManagerAuthenticated'))){
    this.router.navigate(['manager/dashboard']);
  }

  if(Boolean(sessionStorage.getItem('isTravelAdminAuthenticated'))){
    this.router.navigate(['traveladmin/dashboard']);
  }

  if(Boolean(sessionStorage.getItem('isFinanceDepartmentAuthenticated'))){
    this.router.navigate(['finance/dashboard']);
  }

  }

  constructor(private loginService:LoginService,private userDataService:CommonAPIService,private router:Router){

  }

  credentialData: CredentialData = {
    Email: '',
    Password: ''
  };

  //login using email and password
  login(){
  if (this.loginForm.valid) {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    //setting credential data
    this.credentialData = {Email:email,Password:password};
    
    //loading spinner
    this.isLoading = true;

    //sending the login data to the backend.
   this.loginService.postData(this.credentialData).subscribe({

    next:(data)=>{
      console.log(data);
      if(data.token == null){
        this.invalidCredentials = true;
      }

      else
      {
        //user data which contains employeeName, role, department, token, empId
        this.userDataService.userData = data;

        if(this.userDataService.userData){
          console.log(this.loginService.isLoggedIn);          
          this.loginService.isLoggedIn = !this.loginService.isLoggedIn;
          console.log(this.loginService.isLoggedIn);

        //routing based in roles
        //on each routign before entering the page the authenticated status should be set based on the type of user that have entered.
        if((data.department == 'FD' && data.role == 'Employee') || 
        (data.department == 'TA' && data.role == 'Employee') ||
        (data.department == 'HR' && data.role == 'Employee') ||
        (data.department == 'DU1'|| data.department == 'DU2' || data.department == 'DU3' || data.department == 'DU4' || data.department == 'DU5' && data.role == 'Employee')
        )
        {
          sessionStorage.setItem('employeeData', JSON.stringify(data));
          sessionStorage.setItem('isEmployeeAuthenticated',this.loginService.isLoggedIn.toString())
          this.router.navigate(['employee/dashboard']);
        }

        if(
          (data.department == 'DU1'|| data.department == 'DU2' || data.department == 'DU3' || data.department == 'DU4' || data.department == 'DU5' && data.role == 'Manager')
        )
        {
          sessionStorage.setItem('managerData', JSON.stringify(data));
          sessionStorage.setItem('isManagerAuthenticated',this.loginService.isLoggedIn.toString())
          this.router.navigate(['manager/dashboard']);
        }

        if(data.department == 'TA' && data.role == 'Manager'){
          sessionStorage.setItem('travelAdminData', JSON.stringify(data));
          sessionStorage.setItem('isTravelAdminAuthenticated',this.loginService.isLoggedIn.toString())
          this.router.navigate(['traveladmin/dashboard']);
        }

        if(data.department == 'FD' && data.role == 'Manager'){
          sessionStorage.setItem('financePersonnelData', JSON.stringify(data));
          sessionStorage.setItem('isFinanceDepartmentAuthenticated',this.loginService.isLoggedIn.toString())
          console.log(sessionStorage.getItem('isFinanceDepartmentAuthenticated'))
          this.router.navigate(['finance/dashboard']);
        }

        localStorage.setItem('JwtToken',data.token)
        this.invalidCredentials = false;
      }
    }
    },
    error:(error:Error)=>{
      console.log("error hit",error)
    },
    complete:()=>{
      this.isLoading = false;
      this.loginForm.patchValue({
        email: '',
        password: ''
      });
    }
   });
  }
   else {
    console.log('Form is invalid. Please check the fields.');
  }
}
 
}
