import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';


@Component({
  selector: 'app-middle-console',
  templateUrl: './middle-console.component.html',
  styleUrls: ['./middle-console.component.css']
})
export class MiddleConsoleComponent {

  subscription: any;
  

  isSideNavBarCollapsed: any;
  newReqFormSubMenuValue: number;

  currentRoutePath? : string 
  //main heading of middle console 
  mainHeading = ""

  constructor(private sideNavBarService: SideNavBarService, private router:Router) {
    this.newReqFormSubMenuValue = 1;  

    
  }

  //sus
  ngDoCheck() {
    this.isSideNavBarCollapsed = this.sideNavBarService.isSideNavBarCollapsed;
    this.currentRoutePath = this.router.url;
    console.log('Current path:', this.currentRoutePath);
    console.log('Current path:', this.currentRoutePath);
    if(this.currentRoutePath == '/employee/request'){
      this.mainHeading = 'New Travel Request'
    }
    else if(this.currentRoutePath == '/employee/pending'){
      this.mainHeading = 'Pending approval'
    }
    else if(this.currentRoutePath == '/employee/ongoing'){
      this.mainHeading = 'Ongoing Travel'
    }
    else if(this.currentRoutePath == '/employee/history'){
      this.mainHeading = 'Request History'
    }
    
  }

  ngOnInit(){
   
  }






}
