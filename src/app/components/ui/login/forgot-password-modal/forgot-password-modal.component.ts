import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css']
})
export class ForgotPasswordModalComponent {

  constructor(public bsModalRef: BsModalRef) {}

  email: string = ''

  resetPassword(email: string) {
    // Logic to reset password goes here
    console.log('Resetting password for email:', email);
    // Close the modal
    this.bsModalRef.hide();
  }

}
