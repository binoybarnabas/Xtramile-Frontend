import { Component, NgModule } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})

export class EmployeeHomeComponent {

  subscription: any;
  router: any;
  requestData = new Map();

  ngOnDestroy() {
    this.subscription.unSubscribe();
    console.log("UNSUBSCRIBED")
  }

  form!: FormGroup;

  onSubmit() {
    console.log(this.form)
    //  this.postData(this.form.value);
  }



}
