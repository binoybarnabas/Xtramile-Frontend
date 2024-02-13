import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';

@Component({
  selector: 'app-travel-admin-middle-console',
  templateUrl: './travel-admin-middle-console.component.html',
  styleUrls: ['./travel-admin-middle-console.component.css']
})
export class TravelAdminMiddleConsoleComponent {
  subscription: any;
  

  isSideNavBarCollapsed: any;
  newReqFormSubMenuValue: number;

  //main heading of middle console 
  mainHeading = ""
  currentRoutePath?: string;

  constructor(private sideNavBarService: SideNavBarService,private router :Router) {
    this.newReqFormSubMenuValue = 1;

  }

  //sus
  ngDoCheck() {

    this.isSideNavBarCollapsed = this.sideNavBarService.isSideNavBarCollapsed;
    this.currentRoutePath = this.router.url;
    if(this.currentRoutePath == '/traveladmin/incomingrequests'){
      this.mainHeading = 'Incoming Travel Request'
    }
    else if(this.currentRoutePath == '/traveladmin/waiting'){
      this.mainHeading = 'Waiting options'
    }
    else if(this.currentRoutePath == '/traveladmin/selected'){
      this.mainHeading = 'Employee Selected Options'
    }
    else if(this.currentRoutePath == '/traveladmin/ongoing'){
      this.mainHeading = 'Ongoing Options'
    }
    else if(this.currentRoutePath == '/traveladmin/closed'){
      this.mainHeading = 'Closed Requests'
    }
    
  }
}
