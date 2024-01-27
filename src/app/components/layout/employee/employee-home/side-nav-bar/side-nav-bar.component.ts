import { Component } from '@angular/core';
import { SideNavBarService } from '../../../../../services/employeeServices/layoutServices/side-nav-bar.service';


@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})

export class SideNavBarComponent {

  myRequestsMap = new Map<string, string>();
  mySettlementsMap = new Map<string, string>();

  subMenu1ToggleValue = 0;
  subMenu2ToggleValue = 0;

  isSideNavBarCollapsed: any;

  constructor(private sideNavBarService: SideNavBarService) {

    this.isSideNavBarCollapsed = 1;

    //myRequestsMap contains values for My Requests sub menu
    this.myRequestsMap.set('new ri-add-line', "New Requests");
    // this.myRequestsMap.set('ri-draft-line', "Draft Requests");
    this.myRequestsMap.set('ri-loader-line', "Pending Approval ");
    this.myRequestsMap.set('ri-arrow-up-circle-line', "Ongoing Travel")
    this.myRequestsMap.set('ri-history-line', "Request History ")


    //mySettlementsMap contains values for My Settlements sub menu
    this.mySettlementsMap.set('new ri-add-line', "New Bill");
    // this.mySettlementsMap.set('ri-draft-line', "Draft Bills");
    this.mySettlementsMap.set('ri-loader-line', "Pending Bills");
    this.mySettlementsMap.set('ri-history-line', "Closed Bills")

  }


  //In general, hash maps (or hash tables) do not store their key-value pairs in contiguous memory locations;
  // So that the below code snippets will help us to iterate through the hashmap in a contiguos manner;
  // This method returns an iterator over the key-value pairs in the map, where each element of the iterator is a tuple [key, value].

  myRequestsMapEntries(): IterableIterator<[string, string]> {
    return this.myRequestsMap.entries();
  }

  mySettlementsMapEntries(): IterableIterator<[string, string]> {
    return this.mySettlementsMap.entries();
  }


  toggleSubMenu(menuNumber: string) {

    if (this.isSideNavBarCollapsed === 0) {

      if (menuNumber === '1') {

        if (this.subMenu1ToggleValue === 0) {
          this.subMenu1ToggleValue = 1;
        }
        else {
          this.subMenu1ToggleValue = 0;
        }

      }
      else {

        if (this.subMenu2ToggleValue === 0) {
          this.subMenu2ToggleValue = 1;
        }
        else {
          this.subMenu2ToggleValue = 0;
        }

      }


    }

  }


  controlSideBar() {
    this.subMenu1ToggleValue = 0;
    this.subMenu2ToggleValue = 0;
    this.sideNavBarService.controlSideBar();
    this.isSideNavBarCollapsed = this.sideNavBarService.isSideNavBarCollapsed;
  }


  // temp function - to avoid ghost clicking
  doNothing() {
    this.subMenu1ToggleValue = 0;
    this.subMenu2ToggleValue = 0;
  }



}
