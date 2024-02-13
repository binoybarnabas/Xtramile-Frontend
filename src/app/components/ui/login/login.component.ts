import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/loginService/login.service';
import { CredentialData } from 'src/app/components/ui/login/Credential';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { Router } from '@angular/router';
import { UserData } from 'src/app/services/interfaces/iuserData';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ForgotPasswordModalComponent } from './forgot-password-modal/forgot-password-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoading: boolean = false;
  invalidCredentials: boolean = false;
  loginForm!: FormGroup
  bsModalRef!: BsModalRef;

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    // Subscribe to form value changes
    this.loginForm.valueChanges.subscribe((value) => {
      console.log('Form values:', value);
    });

    //to check whether the user already authenticated is true then skip the login and redirect to the page

  }

  constructor(private loginService: LoginService, private userDataService: CommonAPIService, private router: Router, private modalService: BsModalService) {

  }

  credentialData: CredentialData = {
    Email: '',
    Password: ''
  };

  //login using email and password
  login() {


    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      //setting credential data
      this.credentialData = { Email: email, Password: password };

      //loading spinner
      this.isLoading = true;

      if (email == "" || password == "") {
        this.invalidCredentials = true;
      }
      //sending the login data to the backend.
      this.loginService.postData(this.credentialData).subscribe({

        next: (data: UserData) => {
          console.log(data);
          if (data == null) {
            this.invalidCredentials = true;
            console.log("illa");
          }

          else {
            //user data which contains employeeName, role, department, token, empId
            this.userDataService.userData = data;
            if (this.userDataService.userData) {
              console.log(this.loginService.isLoggedIn);
              this.loginService.isLoggedIn = !this.loginService.isLoggedIn;
              console.log(this.loginService.isLoggedIn);
              localStorage.setItem('userData', JSON.stringify(data));
              localStorage.setItem('isAuthenticated', 'true');

              switch (data.role) {
                case 'Employee': this.router.navigate(['employee/dashboard'])
                  break;

                case 'Manager': if (data.department == 'TA') {
                  this.router.navigate(['traveladmin/dashboard'])
                  break;
                }
                else if (data.department == 'FD') {
                  this.router.navigate(['finance/dashboard'])
                  break;
                }
                else {
                  this.router.navigate(['manager/dashboard'])
                  break;
                }
              }

              this.invalidCredentials = false;
              // a fix is required for jwt token handling
              localStorage.setItem('JwtToken', data.token)
            }
          }
        },
        error: (error: Error) => {
          console.log("error hit", error)
        },
        complete: () => {
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

  openForgotPasswordModal() {
    this.bsModalRef = this.modalService.show(ForgotPasswordModalComponent);
  }

}
