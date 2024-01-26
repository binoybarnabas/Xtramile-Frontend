import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavBarService {

  isSideNavBarOpen: any;
  constructor() {
    this.isSideNavBarOpen = 1;
  }


  controlSideBar() {
    if (this.isSideNavBarOpen === 1) {
      this.isSideNavBarOpen = 0;
    } else {
      this.isSideNavBarOpen = 1;
    }
  }

}
