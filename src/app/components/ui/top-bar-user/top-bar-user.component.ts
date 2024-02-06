import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  showDropdown: boolean = false;
  @Output() logoutEvent: EventEmitter<string> = new EventEmitter<string>();
  
  @Input() employeeName:string = ''
  @Input() designation: string =''


  constructor(private sideNavBarService: SideNavBarService) {
    this.isSideNavBarCollapsed = sideNavBarService.isSideNavBarCollapsed;
    this.date = Date.now();
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation(); // Prevent click event from bubbling up to the document
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.showDropdown = false; // Hide dropdown after logout
    this.logoutEvent.emit("logout"); // Emit logout event
  }

}
