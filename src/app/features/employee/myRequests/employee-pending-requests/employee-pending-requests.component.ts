import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { PendingRequest } from './pending-request';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserData } from 'src/app/services/interfaces/iuserData';

@Component({
  selector: 'app-employee-pending-requests',
  templateUrl: './employee-pending-requests.component.html',
  styleUrls: ['./employee-pending-requests.component.css']
})
export class EmployeePendingRequestsComponent {
  private subscription: Subscription | any;
  titles: string[] = ['Request Id', 'Status', 'Project Name', 'Reason for travel', 'Start Date', 'Destination']
  requestData: PendingRequest[] = [];
  empId: number;
  userData: UserData
  tableHeaders = ['Request Code','Project Code','From','To', 'Departure Date','Return Date','Status'];
  dataHeaders = ['requestCode', 'projectCode','sourceCity','destinationCity', 'departureDate','returnDate', 'statusName'];

  pageHeading: string = 'Pending Approval';
  itemsPerPage: number = 10;
  totalCount: number = 0
  currentPage: number = 1;

  constructor(private requestService: RequestService, private router: Router, private activatedRoute: ActivatedRoute, private datepipe: DatePipe) {
    const storedUserData = localStorage.getItem('userData');
    this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;
    this.empId = this.userData?.empId

  }

  ngOnInit() {
    this.getRequests();
  }

  //function to get the requests that have status pending for employee screen
  getRequests() {
    this.subscription = this.requestService.getRequestsPendingStatus(this.empId, this.currentPage, this.itemsPerPage).subscribe({
      next: (data) => {
        data.items.forEach((request: PendingRequest) => {
          (request.statusName === 'Approved by RM' || request.statusName === 'Approved by TA') ? request.statusName = 'Approved' : request.statusName = request.statusName
          request.departureDate = this.datepipe.transform(request.departureDate, "dd/MM/yyyy") || ' '
          request.returnDate = this.datepipe.transform(request.returnDate, "dd/MM/yyyy") || ' '
        })
        this.requestData = data.items;
        this.totalCount = data.totalCount
      },
      error: (error: Error) => {
        console.log("Error has occurred, " + error.message);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }

  navigateToOption(requestId: number) {
    console.log("Clicked")
    this.router.navigate(['available_options'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: { requestId: requestId }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onPageChange(event: any){
    this.currentPage = event.page
    this.getRequests();
  }

}



