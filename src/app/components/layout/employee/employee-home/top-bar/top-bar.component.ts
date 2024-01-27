import { Component } from '@angular/core';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})



export class TopBarComponent {


  isSideNavBarCollapsed: any;
  constructor(private sideNavBarService: SideNavBarService) {

    this.isSideNavBarCollapsed = sideNavBarService.isSideNavBarCollapsed;

  }




}
