import { Component } from '@angular/core';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';

@Component({
  selector: 'app-finance-personnel-side-nav-bar',
  templateUrl: './finance-personnel-side-nav-bar.component.html',
  styleUrls: ['./finance-personnel-side-nav-bar.component.css']
})
export class FinancePersonnelSideNavBarComponent {

  travelSettlementsMap = new Map<string, string>();
  travelReportsMap = new Map<string, string>();
  myRequestsMap = new Map<string, string>();
  mySettlementsMap = new Map<string, string>();

  subMenu1ToggleValue = 0;
  subMenu2ToggleValue = 0;
  subMenu3ToggleValue = 0;
  subMenu4ToggleValue = 0;

  isSideNavBarCollapsed: any;

  constructor(private sideNavBarService: SideNavBarService) {

    this.isSideNavBarCollapsed = 1;

    //travelSettlementsMap contains values for Travel Settlements sub menu
    this.travelSettlementsMap.set('new ri-import-line', "Incoming");
    this.travelSettlementsMap.set('new ri-pass-pending-line', "Pending");
    this.travelSettlementsMap.set('new ri-history-line', "Closed");

    //travelRequestsMap contains values for Travel Reports sub menu
    this.travelReportsMap.set('new ri-mail-download-line', "List Item-1");
    this.travelReportsMap.set('new ri-pass-pending-line', "2");
    this.travelReportsMap.set('new ri-check-double-line', "3");

    //myRequestsMap contains values for My Requests sub menu
    this.myRequestsMap.set('new ri-add-line', "New Request");
    this.myRequestsMap.set('ri-loader-line', "Pending Approval ");
    this.myRequestsMap.set('ri-arrow-up-circle-line', "Ongoing Travel")
    this.myRequestsMap.set('ri-history-line', "Request History ")

    //mySettlementsMap contains values for My Settlements sub menu
    this.mySettlementsMap.set('new ri-add-line', "New Bill");
    this.mySettlementsMap.set('ri-loader-line', "Pending Bills");
    this.mySettlementsMap.set('ri-history-line', "Closed Bills")

  }


  //In general, hash maps (or hash tables) do not store their key-value pairs in contiguous memory locations;
  // So that the below code snippets will help us to iterate through the hashmap in a contiguos manner;
  // This method returns an iterator over the key-value pairs in the map, where each element of the iterator is a tuple [key, value].

  travelReportsMapEntries(): IterableIterator<[string, string]> {
    return this.travelReportsMap.entries();
  }

  travelSettlementsMapEntries(): IterableIterator<[string, string]> {
    return this.travelSettlementsMap.entries();
  }

  myRequestsMapEntries(): IterableIterator<[string, string]> {
    return this.myRequestsMap.entries();
  }

  mySettlementsMapEntries(): IterableIterator<[string, string]> {
    return this.mySettlementsMap.entries();
  }


  toggleSubMenu(menuNumber: string) {

    //side nav bar open
    if (this.isSideNavBarCollapsed === 0) {

      switch (menuNumber) {

        case '1':
          {
            this.subMenu1ToggleValue = this.subMenu1ToggleValue === 0 ? 1 : 0;
            break;
          }

        case '2':
          {
            this.subMenu2ToggleValue = this.subMenu2ToggleValue === 0 ? 1 : 0;
            break;
          }

        case '3':
          {
            this.subMenu3ToggleValue = this.subMenu3ToggleValue === 0 ? 1 : 0;
            break;
          }

        case '4':
          {
            this.subMenu4ToggleValue = this.subMenu4ToggleValue === 0 ? 1 : 0;
          }

        //swicth ends  
      }

      //first if ends
    }

  }


  controlSideBar() {

    this.subMenu1ToggleValue = 0;
    this.subMenu2ToggleValue = 0;
    this.subMenu3ToggleValue = 0;
    this.subMenu4ToggleValue = 0;

    this.sideNavBarService.controlSideBar();
    this.isSideNavBarCollapsed = this.sideNavBarService.isSideNavBarCollapsed;
  }

  // temp function - to avoid ghost clicking
  doNothing() {

    this.subMenu1ToggleValue = 0;
    this.subMenu2ToggleValue = 0;
    this.subMenu3ToggleValue = 0;
    this.subMenu4ToggleValue = 0;

  }

}
