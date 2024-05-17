import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelRequestDetailViewModel } from 'src/app/services/interfaces/iTravelRequestDetails';
import { UserData } from 'src/app/services/interfaces/iuserData';
import { WaitingOrSelectedRequests } from 'src/app/services/interfaces/iwaiting-or-selected-requests';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-manager-forwarded-travel-requests',
  templateUrl: './manager-forwarded-travel-requests.component.html',
  styleUrls: ['./manager-forwarded-travel-requests.component.css']
})


export class ManagerForwardedTravelRequestsComponent {
  travelRequest: TravelRequestDetailViewModel[][] = [];
  waitingRequests: WaitingOrSelectedRequests[][] = [];
  selectedRequests: WaitingOrSelectedRequests[][] = [];
  pageHeading: string = 'Forwarded Travel Requests'
  activeTabIndex: number = 0;

  managerId: number; // to check the data
  userData: UserData
  itemsPerPage = 10;
  forwardedTotalItems = 0;
  waitingTotalItems = 0;
  selectedTotalItems = 0
  totalItems: number[] = [this.forwardedTotalItems,this.waitingTotalItems, this.selectedTotalItems]
  currentPage = 1;
  tableHeaders = ['Request Code', 'Requested By', 'Project Code','From','To','Departure Date','Travel Type', 'Travel Mode', 'Updated On'];
  dataHeaders = ['requestCode', 'employeeNameAndEmail', 'projectCode', 'from', 'to','departureDate','travelType','TravelMode','updatedOn'];
  constructor(private apiService: ManagerTravelRequestsService, private router: Router, private datePipe: DatePipe,private activatedRoute:ActivatedRoute) {
    const storedUserData = localStorage.getItem('userData');
    this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;
    this.managerId = this.userData.empId;
    this.apiService.managerId = this.managerId;

  }

  filters = [{'filterId':'1','filterName':'Filter 1','isActive':'no'},
           {'filterId':'2','filterName':'Filter 2','isActive':'no'}];
       
  //Initialize this tabs array
  tabs: any = [];
  ngOnInit() {
    this.handleTabChange(this.activeTabIndex);
  }

  initializeTabs(forwardedRequests : TravelRequestDetailViewModel[], waitingOptions : WaitingOrSelectedRequests[], selectedOptions : WaitingOrSelectedRequests[]) {
    if(this.activeTabIndex === 0){
      this.tabs = [
        {
          name: 'Forwarded',
          headings: ['RequestId', 'Request Code', 'Requested By', 'Project Code','From','To','Departure Date', 'Forwarded On'],
          entries: forwardedRequests.map((item) => [
            item.requestId,
            item.requestCode,
            item.employeeName,
            item.projectCode,
            item.from,
            item.to,
            item.departureDate,
            item.date,
          ])
        },
        // Placeholder objects for other tabs
        { name: 'Waiting', headings: [], entries: [] },
        { name: 'Selected', headings: [], entries: [] }
    ];
    }
    else if(this.activeTabIndex === 1){
      this.tabs = [
        { name: 'Forwarded', headings: [], entries: [] },
        {
          name: 'Waiting',
          headings: ['RequestId', 'Request Code', 'Requested By', 'Project Code','From','To','Departure Date' ,'Option Sent On'],
          entries: waitingOptions.map((item) => [
            item.requestId,
            item.requestCode,
            item.employeeName,
            item.projectCode,
            item.from,
            item.to,
            item.departureDate,
            item.approvalDate,
          ])
        },
        { name: 'Selected', headings: [], entries: [] }
    ];
    }
    else if(this.activeTabIndex === 2){
      this.tabs = [
        { name: 'Forwarded', headings: [], entries: [] },
        { name: 'Waiting', headings: [], entries: [] },
        {
          name: 'Selected',
          headings: ['RequestId', 'Request Code', 'Requested By', 'Project Code','From','To','Departure Date', 'Updated On'],
          entries: selectedOptions.map((item) => [
            item.requestId,
            item.requestCode,
            item.employeeName,
            item.projectCode,
            item.from,
            item.to,
            item.departureDate,
            item.approvalDate,
          ])
        }
      ];
    }   
  }

  getManagerForwardRequests() {
    this.apiService.getManagerForwardedRequest(this.managerId, this.currentPage, this.itemsPerPage).subscribe({
      next: (data: any) => {
        this.travelRequest[this.currentPage-1] = data.employeeRequest.map((request: any) => {
          return {
            ...request,
            date: this.datePipe.transform(request.date, 'dd/MM/yyyy'),
            departureDate: this.datePipe.transform(request.departureDate, 'dd/MM/yyyy'),
          };
        });        
        this.forwardedTotalItems = data.totalCount;
      },
      error: (error: Error) => {
        console.error('Error:', error);
        // Handle error if needed
      },
      complete: () => {
        this.initializeTabs(this.travelRequest[this.currentPage-1],this.waitingRequests[this.currentPage-1], this.selectedRequests[this.currentPage-1]);
        this.totalItems = [this.forwardedTotalItems, this.waitingTotalItems, this.selectedTotalItems];
      }
    });
  }

  getWaitingRequests(){
    this.apiService.getWaitingOrSelectedRequests(this.managerId,'PE','WT',this.currentPage,this.itemsPerPage).subscribe({
      next: (data) => {
        this.waitingRequests[this.currentPage-1] = data.items.map((request: any) => {
          return {
            ...request,
            departureDate: this.datePipe.transform(request.departureDate, 'dd/MM/yyyy'),
            approvalDate: this.datePipe.transform(request.approvalDate, 'dd/MM/yyyy')
          };
        });
        this.waitingTotalItems = data.totalCount;        
      },
      error: (error: Error) => {
        console.error('Error: ' + error.message);
      },
      complete: () => {
        this.initializeTabs(this.travelRequest[this.currentPage-1],this.waitingRequests[this.currentPage-1], this.selectedRequests[this.currentPage-1]);
        this.totalItems = [this.forwardedTotalItems, this.waitingTotalItems, this.selectedTotalItems];
      }
    })
  }

  getSelectedRequests(){
    this.apiService.getWaitingOrSelectedRequests(this.managerId,'PE','SD',this.currentPage,this.itemsPerPage).subscribe({
      next: (data) => {
        this.selectedRequests[this.currentPage-1] = data.items.map((request: any) => {
          return {
            ...request,
            departureDate: this.datePipe.transform(request.departureDate, 'dd/MM/yyyy'),
            approvalDate: this.datePipe.transform(request.approvalDate, 'dd/MM/yyyy')
          };
        });
        this.selectedTotalItems = data.totalCount;        
      },
      error: (error: Error) => {
        console.error('Error: ' + error.message);
      },
      complete: () => {
        this.initializeTabs(this.travelRequest[this.currentPage-1],this.waitingRequests[this.currentPage-1], this.selectedRequests[this.currentPage-1]);
        this.totalItems = [this.forwardedTotalItems, this.waitingTotalItems, this.selectedTotalItems];
      }
    })
  }

  upDateRequest(){
    switch(this.activeTabIndex){
      case 0: {
        if(!this.travelRequest[this.currentPage-1])
          this.getManagerForwardRequests();
        else
          this.initializeTabs(this.travelRequest[this.currentPage-1],this.waitingRequests[this.currentPage-1], this.selectedRequests[this.currentPage-1]);  
        break;
      }
      case 1: {
        if(!this.waitingRequests[this.currentPage-1])
          this.getWaitingRequests();
        else
          this.initializeTabs(this.travelRequest[this.currentPage-1],this.waitingRequests[this.currentPage-1], this.selectedRequests[this.currentPage-1]);
        break;          
      }
      case 2: {
        if(!this.selectedRequests[this.currentPage-1])
          this.getSelectedRequests();
        else
          this.initializeTabs(this.travelRequest[this.currentPage-1],this.waitingRequests[this.currentPage-1], this.selectedRequests[this.currentPage-1]);
        break;        
      }
    }
  }

  // handle page change event
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.upDateRequest();
  }

  // pageChanged(currentPage: number){
  //   this.currentPage = currentPage;
  //   this.upDateRequest();
  // }

  // navigation 
  requestId!:number;
  queryParams: any = {};
  handleSelectedRow(row: any){
    console.log(row)
    // if(this.activeTabIndex === 1 || this.activeTabIndex === 2){
    //   this.requestId = row[1][0];
    //   console.log(row);
    //   if(this.activeTabIndex == 1){
    //     this.queryParams = {requestId: this.requestId}
    //   }
    //   if(this.activeTabIndex === 2){
    //     this.queryParams = {requestId: this.requestId,IsSelectedPage:true}
    //   }
    //   this.router.navigate(['view_options_travel'], { relativeTo: this.activatedRoute,queryParams: this.queryParams});
    // }
    console.log('row details forward',row)
    this.requestId = row[1][0];
    this.queryParams = {requestId: this.requestId}
    this.router.navigate(['manager/requestdetail'], {queryParams: this.queryParams});
  } 

  handleTabChange(activeTabIndex : number){
    this.activeTabIndex = activeTabIndex;
    this.currentPage = 1;
    this.upDateRequest();
    setTimeout(() => {
      this.currentPage = 1;
    })
  }  
}
