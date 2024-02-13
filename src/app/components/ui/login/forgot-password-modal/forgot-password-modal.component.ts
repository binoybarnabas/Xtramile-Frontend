import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css']
})
export class ForgotPasswordModalComponent {

  constructor(public bsModalRef: BsModalRef, private loginService: LoginService) {}

  email: string = ''
  newPassword: string = ''
  reEnteredPassword: string = ''

  private subscription:  Subscription | any;

  form!: FormGroup
  
  ngOnInit(){
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('',Validators.required),
      reEnteredPassword: new FormControl('',Validators.required)
    })
  }

  resetPassword() {

    this.email = this.form.get('email')?.value;
    this.newPassword = this.form.get('password')?.value;
    this.reEnteredPassword =  this.form.get('reEnteredPassword')?.value;

    this.subscription = this.loginService.updatePassword(this.email,this.newPassword).subscribe({
      next: (data) => {
        console.log(data)
        alert("Password Updated Successfully")
      },
      error: (error: Error) => {
        console.log("Password not Updated")
        console.log(error.message)
      },
      complete: () => {
        console.log('Password Update Completed')
      }
    })

    this.bsModalRef.hide();
  }

}
