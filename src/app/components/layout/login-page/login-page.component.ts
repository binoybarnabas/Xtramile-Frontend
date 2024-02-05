import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  email: string = '';
  password: string = '';

  login():void {

    // Implement your login logic here
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Add your authentication logic here
  }
}
