import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/services/interfaces/iuserData';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-manager-forwarded-travel-requests',
  templateUrl: './manager-forwarded-travel-requests.component.html',
  styleUrls: ['./manager-forwarded-travel-requests.component.css']
})
export class ManagerForwardedTravelRequestsComponent {
  travelRequest = []
  pageHeading: string = 'Forwarded Travel Requests'

  managerId: number; // to check the data
  userData: UserData
  itemsPerPage = 10;
  totalItems = 0;
  currentPage = 1;
  tableHeaders = ['RequestID', 'Employee', 'ProjectCode', 'Date', 'Status'];
  dataHeaders = ['requestId', 'employeeNameAndEmail', 'projectCode', 'date', 'status'];
  constructor(private apiService: ManagerTravelRequestsService, private router: Router, private datePipe: DatePipe) {
    const storedUserData = localStorage.getItem('userData');
    this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;
    this.managerId = this.userData.empId;
    this.apiService.managerId = this.managerId;

  }

  ngOnInit() {
    this.getManagerForwardRequests();
  }


  getManagerForwardRequests() {
    console.log("inside get forward req")
    this.apiService.getManagerForwardedRequest(this.managerId, this.currentPage, this.itemsPerPage).subscribe({
      next: (data: any) => {
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
}
