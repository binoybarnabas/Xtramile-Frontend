import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavBarService {

  isSideNavBarCollapsed: any;
  constructor() {
    this.isSideNavBarCollapsed = 1;
  }


  //collapse
  controlSideBar() {
    if (this.isSideNavBarCollapsed === 1) {
      this.isSideNavBarCollapsed = 0;
    } else {
      this.isSideNavBarCollapsed = 1;
    }
  }









}
