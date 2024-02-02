import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-manager-incoming-travel-requests',
  templateUrl: './manager-incoming-travel-requests.component.html',
  styleUrls: ['./manager-incoming-travel-requests.component.css']
})
export class ManagerIncomingTravelRequestsComponent {

  selectedDate!: Date | null;
  email: string = '';

  employeeRequest: any[] | undefined;
  value: any;

  itemsPerPage = 10;
  totalItems = 0;
  currentPage = 1;

  // Load all the employee request while initializing
  ngOnInit() {
    this.fetchEmployeeRequest();
  }

  // Constructor to inject services
  constructor(private apiservice: ManagerTravelRequestsService, private datePipe: DatePipe) {}

  // Manager ID for fetching employee requests
  managerId = 9;

  // Fetch all the employee requests
  fetchEmployeeRequest() {
    this.apiservice.getEmployeeRequest(this.managerId).subscribe({
      next: (data: any[]) => {
        this.employeeRequest = data;
        this.totalItems = data.length;
      },
      error: (error: any) => {
        console.error('Error fetching employee requests', error);
      }
    });
  }

  // Fetch employee requests created on a specific date
  fetchEmployeeRequestByDate() {
    if (this.selectedDate) {
      const date = this.datePipe.transform(this.selectedDate, 'yyyy-MM-ddTHH:mm:ss.SS');
      this.apiservice.getEmployeeRequestByDate(this.managerId, date as string).subscribe({
        next: (data: any[]) => {
          console.log(data);
        },
        error: (error: any) => {
          console.log("Error fetching Requests by Date")
        }
      });
    } else {
      console.error('Selected date is undefined');
    }
  }

  // Handle page change event
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.fetchEmployeeRequest();
  }

  // Fetch all employee requests when SeeAll button is pressed
  seeAllRequest() {
    this.fetchEmployeeRequest();
  }

  // Selected sort option for sorting employee requests
  selectedSortOption: string = 'Sort';

  // Set the selected sort option
  setSortOption(option: string): void {
    this.selectedSortOption = option;
    this.sortData(option);
  }

  // Sort employee requests based on the selected option
  sortData(option: string): void {
    if (option == "Email") {
      this.apiservice.getEmployeeRequestSortByEmail(this.managerId).subscribe({
        next: (data: any[]) => {
          this.employeeRequest = data;
        },
        error: (error: any) => {
          console.log("Error fetching the requests")
        }
      });
    } else if (option == "Date") {
      this.apiservice.getEmployeeRequestSortByDate(this.managerId).subscribe({
        next: (data: any[]) => {
          this.employeeRequest = data;
        },
        error: (error: any) => {
          console.log("Error fetching the requests")
        }
      });
    } else if (option == "RequestId") {
      this.apiservice.getEmployeeRequestSortByRequestCode(this.managerId).subscribe({
        next: (data: any[]) => {
          this.employeeRequest = data;
        },
        error: (error: any) => {
          console.log("Error fetching the requests")
        }
      });
    }
  }

  // Get employee requests based on email
  getRequestByEmail() {
    this.apiservice.getEmployeeRequestByEmail(this.managerId, this.email).subscribe({
      next: (data: any[]) => {
        this.employeeRequest = data;
        console.log(this.employeeRequest);
      },
      error: (error: any) => {
        console.log("Error fetching the requests")
      }
    });
  }
}
