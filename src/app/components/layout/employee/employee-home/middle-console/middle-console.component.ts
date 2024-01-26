import { Component } from '@angular/core';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';


@Component({
  selector: 'app-middle-console',
  templateUrl: './middle-console.component.html',
  styleUrls: ['./middle-console.component.css']
})
export class MiddleConsoleComponent {

  subscription: any;
  router: any;

  isSideNavBarOpen: any;
  newReqFormSubMenuValue: number;

  //main heading of middle console 
  mainHeading = "New Travel Request"

  constructor(private sideNavBarService: SideNavBarService) {
    this.newReqFormSubMenuValue = 1;
  }

  //sus
  ngDoCheck() {
    this.isSideNavBarOpen = this.sideNavBarService.isSideNavBarOpen;

  }





}
