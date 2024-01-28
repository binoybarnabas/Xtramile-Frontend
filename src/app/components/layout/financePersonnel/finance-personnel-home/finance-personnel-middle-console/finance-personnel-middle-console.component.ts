import { Component } from '@angular/core';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';

@Component({
  selector: 'app-finance-personnel-middle-console',
  templateUrl: './finance-personnel-middle-console.component.html',
  styleUrls: ['./finance-personnel-middle-console.component.css']
})
export class FinancePersonnelMiddleConsoleComponent {
  subscription: any;
  router: any;

  isSideNavBarCollapsed: any;
  newReqFormSubMenuValue: number;

  //main heading of middle console 
  mainHeading = "Incoming Travel Request"

  constructor(private sideNavBarService: SideNavBarService) {
    this.newReqFormSubMenuValue = 1;

  }

  //sus
  ngDoCheck() {

    this.isSideNavBarCollapsed = this.sideNavBarService.isSideNavBarCollapsed;

  }
}
