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
  }

  constructor(private loginService:LoginService,private userDataService:CommonAPIService,private router:Router){
  
  }

  credentialData: CredentialData = {
    Email: '',
    Password: ''
  };

  login(){
  if (this.loginForm.valid) {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.credentialData = {Email:email,Password:password};
    
    this.isLoading = true;
   this.loginService.postData(this.credentialData).subscribe({
    next:(data)=>{

      console.log(data);
      if(data.token == null){
        this.invalidCredentials = true;
      }
      else{
        this.userDataService.userData = data;
        
        if((data.department == 'FD' && data.role == 'Employee') || 
        (data.department == 'TA' && data.role == 'Employee') ||
        (data.department == 'HR' && data.role == 'Employee') ||
        (data.department == 'DU1'|| data.department == 'DU2' || data.department == 'DU3' || data.department == 'DU4' || data.department == 'DU5' && data.role == 'Employee')
        )
        {
          this.router.navigate(['employee/dashboard']);
        }

        if(
          (data.department == 'DU1'|| data.department == 'DU2' || data.department == 'DU3' || data.department == 'DU4' || data.department == 'DU5' && data.role == 'Manager')
        )
        {
          this.router.navigate(['manager/dashboard']);
        }

        if(data.department == 'TA' && data.role == 'Manager'){
          this.router.navigate(['traveladmin/dashboard']);
        }

        if(data.department == 'FD' && data.role == 'Manager'){
          this.router.navigate(['finance/dashboard']);
        }

        localStorage.setItem('JwtToken',data.token)
        this.invalidCredentials = false;
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
