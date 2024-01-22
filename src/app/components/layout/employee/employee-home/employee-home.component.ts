import { Component, NgModule } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeServiceService } from 'src/app/services/employeeServices/employee-service.service';
// import { SideNavBarComponent } from '../side-nav-bar/side-nav-bar.component';
// import { TopBarComponent } from '../top-bar/top-bar.component';


@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})

// @NgModule({
//   declarations: [
//     SideNavBarComponent,
//     TopBarComponent
//   ]

// })


export class EmployeeHomeComponent {

  subscription: any;
  router: any;
  requestData = new Map();


  constructor(private apiService: EmployeeServiceService) {

    // private router: Router;


  }


  ngOnDestroy() {
    this.subscription.unSubscribe();
    console.log("UNSUBSCRIBED")
  }



  form!: FormGroup;






  onSubmit() {
    console.log(this.form)
    this.postData(this.form.value);
  }


  postData(data: any) {
    this.apiService.postData(data).subscribe((data) => {
      console.log(data);
    })
  }




}
