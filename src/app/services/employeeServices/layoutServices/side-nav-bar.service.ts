import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavBarService {

isSideNavBarCollapsed: boolean = true;
  
//collapse
controlSideBar() {
    this.isSideNavBarCollapsed = this.isSideNavBarCollapsed ? false : true;
}


}
