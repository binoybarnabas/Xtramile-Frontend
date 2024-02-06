import { Component, Input } from '@angular/core';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { CustomDatePipe } from 'src/app/pipes/CustomDate/custom-date.pipe';
@Component({
  selector: 'app-top-bar-user',
  templateUrl: './top-bar-user.component.html',
  styleUrls: ['./top-bar-user.component.css']
})
export class TopBarUserComponent {
  date:any
  isSideNavBarCollapsed: any;
  constructor(private sideNavBarService: SideNavBarService) {
    this.isSideNavBarCollapsed = sideNavBarService.isSideNavBarCollapsed;
    this.date = Date.now();
  }


  @Input() employeeName:string = ''
  @Input() designation: string =''

}
