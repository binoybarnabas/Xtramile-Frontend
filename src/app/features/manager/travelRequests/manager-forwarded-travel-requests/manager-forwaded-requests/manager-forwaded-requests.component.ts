import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelRequestDetailViewModel } from 'src/app/services/interfaces/iTravelRequestDetails';
import { UserData } from 'src/app/services/interfaces/iuserData';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-manager-forwaded-requests',
  templateUrl: './manager-forwaded-requests.component.html',
  styleUrls: ['./manager-forwaded-requests.component.css']
})
export class ManagerForwadedRequestsComponent {
  travelRequest = []
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
    this.initializeTabs(this.travelRequest,this.travelRequest, this.travelRequest)
    
  }

  initializeTabs(forwardedRequests : TravelRequestDetailViewModel[], waitingOptions : TravelRequestDetailViewModel[], selectedOptions : TravelRequestDetailViewModel[]) {
    if (forwardedRequests && waitingOptions && selectedOptions) {
      this.tabs = [
        {
          name: 'Forwarded',
          headings: ['RequestID', 'Employee', 'ProjectCode', 'Date', 'Status'],
          entries: forwardedRequests.map((item) => [
            item.requestId,
            item.employeeName,
            item.projectCode,
            item.departureDate,
            item.primaryStatus
          ])
        },
        {
          name: 'Waiting',
          headings: ['RequestID', 'Employee', 'ProjectCode', 'Date', 'Status'],
          entries: waitingOptions.map((item) => [
            item.requestCode,
            item.employeeName,
            item.projectCode,
            item.departureDate,
            item.primaryStatus
          ])
        },
        {
          name: 'Selected',
          headings: ['RequestID', 'Employee', 'ProjectCode', 'Date', 'Status'],
          entries: selectedOptions.map((item) => [
            item.requestCode,
            item.employeeName,
            item.projectCode,
            item.departureDate,
            item.primaryStatus
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
            employeeNameAndEmail: `${request.employeeName}\n${request.email}`
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
    });
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
