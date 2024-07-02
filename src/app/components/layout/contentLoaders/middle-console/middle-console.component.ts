import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { ImageViewerService } from 'src/app/services/helperServices/commonUIServices/image-viewer-service/image-viewer.service';


@Component({
  selector: 'app-middle-console',
  templateUrl: './middle-console.component.html',
  styleUrls: ['./middle-console.component.css']
})
export class MiddleConsoleComponent {

  subscription: any;

  //isSideNavBarCollapsed: any;
  newReqFormSubMenuValue: number;

  currentRoutePath?: string
  //main heading of middle console 
  mainHeading = "Dashboard"

  constructor(private sideNavBarService: SideNavBarService, private router: Router) {
    this.newReqFormSubMenuValue = 1;
  }

  //sus
  ngDoCheck() {

    this.currentRoutePath = this.router.url;

    if (this.currentRoutePath == '/employee/request') {
      this.mainHeading = 'New Travel Request'
    }
    else if (this.currentRoutePath == '/employee/pending') {
      this.mainHeading = 'Pending approval'
    }
    else if (this.currentRoutePath == '/employee/ongoing') {
      this.mainHeading = 'Ongoing Travel'
    }
    else if (this.currentRoutePath == '/employee/history') {
      this.mainHeading = 'Request History'
    }

  }

  // Getter to access the collapsed state from the service
  get isSideNavBarCollapsed(): boolean {
    return this.sideNavBarService.isSideNavBarCollapsed;
  }




}
