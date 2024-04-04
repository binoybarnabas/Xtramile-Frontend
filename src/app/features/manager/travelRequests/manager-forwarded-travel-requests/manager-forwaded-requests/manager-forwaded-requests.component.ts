import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelRequestDetailViewModel } from 'src/app/services/interfaces/iTravelRequestDetails';
import { UserData } from 'src/app/services/interfaces/iuserData';
import { WaitingOrSelectedRequests } from 'src/app/services/interfaces/iwaiting-or-selected-requests';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-manager-forwaded-requests',
  templateUrl: './manager-forwaded-requests.component.html',
  styleUrls: ['./manager-forwaded-requests.component.css']
})
export class ManagerForwadedRequestsComponent {
  travelRequest = []
  waitingRequests = []
  selectedRequests = []
  pageHeading: string = 'Forwarded Travel Requests'

  managerId: number; // to check the data
  userData: UserData
  itemsPerPage = 10;
  totalItems = 0;
  currentPage = 1;
  tableHeaders = ['RequestID', 'Employee', 'ProjectCode', 'Date', 'Status'];
  dataHeaders = ['requestId', 'employeeNameAndEmail', 'projectCode', 'date', 'status'];
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
    this.getManagerForwardRequests();
    this.getWaitingRequests();

  }

  initializeTabs(forwardedRequests : TravelRequestDetailViewModel[], waitingOptions : WaitingOrSelectedRequests[], selectedOptions : WaitingOrSelectedRequests[]) {
    if (forwardedRequests && waitingOptions && selectedOptions) {
      console.log(forwardedRequests);
      this.tabs = [
        {
          name: 'Forwarded',
          headings: ['RequestID', 'Employee', 'ProjectCode', 'Date', 'Status'],
          entries: forwardedRequests.map((item) => [
            item.requestId,
            item.employeeName,
            item.projectCode,
            item.date,
            item.status
          ])
        },
        {
          name: 'Waiting',
          headings: ['RequestID', 'Employee', 'ProjectCode', 'Date'],
          entries: waitingOptions.map((item) => [
            item.requestId,
            item.employeeName,
            item.projectCode,
            item.createdOn,
          ])
        },
        {
          name: 'Selected',
          headings: ['RequestID', 'Employee', 'ProjectCode', 'Date'],
          entries: selectedOptions.map((item) => [
            item.requestId,
            item.employeeName,
            item.projectCode,
            item.createdOn,
          ])
        }
      ];
    }
   
  }

  getManagerForwardRequests() {
    console.log("inside get forward req")
    this.apiService.getManagerForwardedRequest(this.managerId, this.currentPage, this.itemsPerPage).subscribe({
      next: (data: any) => {
        console.log(data.employeeRequest);
        this.travelRequest = data.employeeRequest.map((request: any) => {
          return {
            ...request,
            date: this.datePipe.transform(request.date, 'dd/MM/yyyy'),
          };
        });
        
        this.totalItems = data.totalCount;

        console.log(data);
        console.log(this.travelRequest);
      },
      error: (error: Error) => {
        console.error('Error:', error);
        // Handle error if needed
      },
      complete: () => {
        this.initializeTabs(this.travelRequest,this.waitingRequests, this.selectedRequests)
      }
    });
  }

  getWaitingRequests(){
    this.apiService.getWaitingOrSelectedRequests(this.managerId,'PE','WT',this.currentPage,this.itemsPerPage).subscribe({
      next: (data) => {
        this.waitingRequests = data.travelRequest.map((request: any) => {
          return {
            ...request,
            createdOn: this.datePipe.transform(request.createdOn, 'dd/MM/yyyy')
          };
        });
        this.totalItems = data.totalCount;        
      },
      error: (error: Error) => {
        console.error('Error: ' + error.message);
      },
      complete: () => {
        this.initializeTabs(this.travelRequest,this.waitingRequests, this.selectedRequests)
      }
    })
  }

  getSelectedRequests(){
    this.apiService.getWaitingOrSelectedRequests(this.managerId,'PE','SD',this.currentPage,this.itemsPerPage).subscribe({
      next: (data) => {
        this.waitingRequests = data.travelRequest.map((request: any) => {
          return {
            ...request,
            createdOn: this.datePipe.transform(request.createdOn, 'dd/MM/yyyy')
          };
        });
        this.totalItems = data.totalCount;        
      },
      error: (error: Error) => {
        console.error('Error: ' + error.message);
      },
      complete: () => {
        this.initializeTabs(this.travelRequest,this.waitingRequests, this.selectedRequests)
      }
    })
  }


  // handle page change event
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getManagerForwardRequests();
  }
  // navigation 
  selectedRow: any;
  requestId!:number;
  handleSelectedRow(row: any){
    this.selectedRow = row;
    console.log(this.selectedRow.requestId)
    this.requestId = this.selectedRow.requestId
    const queryParams = { requestId: this.requestId }
    this.router.navigate(['view_options_travel'], { relativeTo: this.activatedRoute,queryParams: queryParams });
  } 
}
