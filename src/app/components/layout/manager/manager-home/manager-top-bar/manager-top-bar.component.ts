import { Component } from '@angular/core';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';

@Component({
  selector: 'app-manager-top-bar',
  templateUrl: './manager-top-bar.component.html',
  styleUrls: ['./manager-top-bar.component.css']
})
export class ManagerTopBarComponent {

  isSideNavBarCollapsed: any;
  constructor(private sideNavBarService: SideNavBarService) {

    this.isSideNavBarCollapsed = sideNavBarService.isSideNavBarCollapsed;

  }


}
