import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-manager-incoming-travel-requests',
  templateUrl: './manager-incoming-travel-requests.component.html',
  styleUrls: ['./manager-incoming-travel-requests.component.css']
})
export class ManagerIncomingTravelRequestsComponent {

  selectedDate!:Date;
  searchByName!:string;
  sqlDatetimeFormat!: string;
  sortedData : any
  employeeRequest: any[] | undefined;
  // Manager ID for fetching employee requests
  managerId = 2;
  itemsPerPage = 10;
  totalItems = 0;
  currentPage = 1;

  //get the selected date and filter data based on selected dates
  handleDateSelection(selectedDate: Date): void {
    //To convert date from standard js Date format to YYYY-MM-DD format
    this.sqlDatetimeFormat = selectedDate.toISOString().slice(0, 10);
    this.apiservice.getEmployeeRequestByDate(this.managerId,this.sqlDatetimeFormat).subscribe({
      next: (data) => {
        this.sortedData = data;
        this.employeeRequest = this.sortedData;
      },
      error: (err) => {
        // Handle the error
        console.error('Error:', err);
      },
      complete: () => {
        // Handle the completion (if needed)
        console.log('Request completed');
      }
    });
    console.log(this.sqlDatetimeFormat);
  }

  // list the requests based on the employee name
  handleSearchByName(searchByName: string): void {
    // Handle the list by listing all the requests based on empoyee name
    console.log(searchByName);
    //when the search name is empty show all the names by default
    if(searchByName == ''){
      this.fetchEmployeeRequest();
    }

    this.apiservice.getEmployeeRequestByEmployeeName(searchByName, this.managerId).subscribe({
      next: (data) => {
        this.employeeRequest = data;
        console.log("employee request search by name list");
        console.log(data);
        console.log(this.employeeRequest);
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle error if needed
      },
      complete: () => {
        console.log('Request completed');
        // Additional logic after the request is completed
      }
    });
  }

  // get all the requests that comes under a manager
  handleSeeAllClick(): void {
    // Handle the "See All" click
    this.fetchEmployeeRequest();
  }


  //needs to be done
  handleSortOptionSelection(selectedSortOption: string): void {
    // Handle the selected sort option
    console.log('Selected Sort Option:', selectedSortOption);

    

  }

  // Load all the employee request while initializing
  ngOnInit() {
    this.fetchEmployeeRequest();
  }

  // Constructor to inject services
  constructor(private apiservice: ManagerTravelRequestsService) {}


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

  // Set the selected sort option
  // setSortOption(option: string): void {
  //   this.selectedSortOption = option;
  //   this.sortData(option);
  // }

  // Sort employee requests based on the selected option
  // sortData(option: string): void {
  //   if (option == "") {
  //     this.apiservice.getEmployeeRequestSortByEmail(this.managerId).subscribe({
  //       next: (data: any[]) => {
  //         this.employeeRequest = data;
  //       },
  //       error: (error: any) => {
  //         console.log("Error fetching the requests")
  //       }
  //     });
  //   } else if (option == "Date") {
  //     this.apiservice.getEmployeeRequestSortByDate(this.managerId).subscribe({
  //       next: (data: any[]) => {
  //         this.employeeRequest = data;
  //       },
  //       error: (error: any) => {
  //         console.log("Error fetching the requests")
  //       }
  //     });
  //   } else if (option == "RequestId") {
  //     this.apiservice.getEmployeeRequestSortByRequestCode(this.managerId).subscribe({
  //       next: (data: any[]) => {
  //         this.employeeRequest = data;
  //       },
  //       error: (error: any) => {
  //         console.log("Error fetching the requests")
  //       }
  //     });
  //   }
  // }
 
}
