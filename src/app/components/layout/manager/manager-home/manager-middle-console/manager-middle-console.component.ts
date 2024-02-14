import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';

@Component({
  selector: 'app-manager-middle-console',
  templateUrl: './manager-middle-console.component.html',
  styleUrls: ['./manager-middle-console.component.css']
})
export class ManagerMiddleConsoleComponent {

  subscription: any;

  isSideNavBarCollapsed: any;
  newReqFormSubMenuValue: number;

  //main heading of middle console 
  mainHeading = "Dashboard"
  currentRoutePath?: string
  constructor(private sideNavBarService: SideNavBarService, private router: Router) {
    this.newReqFormSubMenuValue = 1;

  }

  //sus
  ngDoCheck() {

    this.isSideNavBarCollapsed = this.sideNavBarService.isSideNavBarCollapsed;
    this.currentRoutePath = this.router.url;

    if (this.currentRoutePath == '/manager/newrequests') {
      this.mainHeading = 'Incoming Travel Request'
    }
    else if (this.currentRoutePath == '/manager/forwarded') {
      this.mainHeading = 'Approved Requests'
    }
    else if (this.currentRoutePath == '/manager/ongoing') {
      this.mainHeading = 'Ongoing Travel details'
    }
    else if (this.currentRoutePath == '/manager/closed') {
      this.mainHeading = 'Closed request History'
    }
  }


}
