import { Component } from '@angular/core';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { DatePipe } from '@angular/common';
import { StatusCodes } from 'src/app/utils/StatusEnum';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TravelRequestCardModalComponent } from 'src/app/components/ui/travel-request-card-modal/travel-request-card-modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manager-ongoing-travel-requests',
  templateUrl: './manager-ongoing-travel-requests.component.html',
  styleUrls: ['./manager-ongoing-travel-requests.component.css']
})
export class ManagerOngoingTravelRequestsComponent {
  pageHeading: string = 'Ongoing Trips'

  tableHeaders: string[] = ['Request Code', 'Requested By', 'Project Code', 'From', 'To','Departure Date', 'Ticket Status', 'Trip Status'];
  fieldsToDisplay: string[] = ['requestCode', 'employeeNameAndEmail', 'projectCode', 'from', 'to', 'departureDate', 'ticketStatus', 'statusName'];
  incomingRequestdata: any[] = [];
  managerId!: number;
  currentPage: number = 1;
  totalCount: number = 0;
  itemsPerPage: number = 10;
  sqlDatetimeFormat!: string;

  totalItems = 0;
  selectedSortOption!: string;

  constructor(private apiservice: ManagerTravelRequestsService, private datePipe:DatePipe,private router: Router, ) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.managerId = parsedUserData.empId;
    }
  }

  ngOnInit() {
    //get employee ongoing data such as requestId, employeeNameAndEmail, projectCode, createdOn, travelTypeName, priorityName, statusName
    this.apiservice.getManagerOngoingTravelRequest(this.managerId, this.currentPage, this.itemsPerPage).subscribe((data: any) => {
      this.incomingRequestdata = this.formatData(data.items);
      this.totalCount = data.totalCount
    });
  }

  selectedRow: any | null = null;
  requestId: number = 0;
  bsModalRef!: BsModalRef

  handleSelectedRow(row: any) {

    this.requestId = row.requestId;
    const queryParams = { requestId: this.requestId }
    this.router.navigate(['manager/requestdetail'],{ queryParams: queryParams });
    
  }


  formatData(data: any[]): any[] {
    //using DatePipe to convert the date into dd/LL/yyyy format
    const datePipe = new DatePipe('en-US');
    return data.map(item => ({
      ...item,
      departureDate: datePipe.transform(item.createdOn, 'dd/LL/yyyy'),
      //concatinating the employeeName and employeeemail, we can split the data using \n
      //this is to show two data in a single cell,
      employeeNameAndEmail: `${item.employeeName}\n${item.employeeEmail}`
    }));
  }

  onPageChange(event: any){
    this.currentPage = event.page;
    this.apiservice.getManagerOngoingTravelRequest(this.managerId, this.currentPage, this.itemsPerPage).subscribe((data: any) => {
      this.incomingRequestdata = this.formatData(data.items);
    });    
  }

  //get the selected date and filter data based on selected dates
  handleDateSelection(selectedDate: Date): void {
    //To convert date from standard js Date format to YYYY-MM-DD format
    this.sqlDatetimeFormat = selectedDate.toISOString().slice(0, 10);
    this.apiservice.getEmployeeRequestByDate(this.managerId, this.sqlDatetimeFormat, this.currentPage, this.itemsPerPage).subscribe({
      next: (data) => {
        this.incomingRequestdata = data.employeeRequest.map((request: any) => {
          return {
            ...request,
            date: this.datePipe.transform(request.date, 'dd/MM/yyyy'),
            employeeNameAndEmail: `${request.employeeName}\n${request.email}`
          };
        });
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

   // get all the requests that comes under a manager
   handleSeeAllClick(): void {
    // Handle the "See All" click
    this.fetchEmployeeRequest();
  }

  //needs to be done
  handleSortOptionSelection(selectedSortOption: string): void {
    // Handle the selected sort option
    console.log('Selected Sort Option:', selectedSortOption);
    this.selectedSortOption = selectedSortOption;
    this.sortData(selectedSortOption);
  }

    // Fetch all the employee requests
    fetchEmployeeRequest() {
      this.apiservice.getEmployeeRequest(this.managerId, StatusCodes.Ongoing,this.currentPage, this.itemsPerPage).subscribe({
        next: (data: any) => {
          this.incomingRequestdata = data.employeeRequest.map((request: any) => {
            return {
              ...request,
              date: this.datePipe.transform(request.date, 'dd/MM/yyyy'),
              employeeNameAndEmail: `${request.employeeName}\n${request.email}`
            };
          });
          console.log(this.incomingRequestdata)
          this.totalItems = data.totalCount;
        },
        error: (error: any) => {
          console.error('Error fetching employee requests', error);
        }
      });
    }
      //Sort employee requests based on the selected option
  sortData(option: string): void {
    if (option == "name") {
      this.apiservice.getEmployeeRequestSortByEmployeeName(this.managerId,StatusCodes.Ongoing, this.currentPage, this.itemsPerPage).subscribe({
        next: (data: any) => {
          this.incomingRequestdata = data.employeeRequest.map((request: any) => {
            return {
              ...request,
              date: this.datePipe.transform(request.date, 'dd/MM/yyyy'),
              employeeNameAndEmail: `${request.employeeName}\n${request.email}`
            };
          });
          this.totalItems = data.totalCount;
        },
        error: (error: any) => {
          console.log("Error fetching the requests", error)
        }
      });
    }
    if (option == "date") {
      this.apiservice.getEmployeeRequestSortByDate(this.managerId, StatusCodes.Ongoing, this.currentPage, this.itemsPerPage).subscribe({
        next: (data: any) => {
          this.incomingRequestdata = data.employeeRequest.map((request: any) => {
            return {
              ...request,
              date: this.datePipe.transform(request.date, 'dd/MM/yyyy'),
              employeeNameAndEmail: `${request.employeeName}\n${request.email}`
            };
          });
          this.totalItems = data.totalCount;
        },
        error: (error: any) => {
          console.log("Error fetching the requests", error)
        }
      });
    }
  }
    // list the requests based on the employee name
    handleSearchByName(searchByName: string): void {
      // Handle the list by listing all the requests based on empoyee name
      console.log(searchByName);
      //when the search name is empty show all the names by default
      if (searchByName == '') {
        this.fetchEmployeeRequest();
      }
  
      this.apiservice.getEmployeeRequestByEmployeeName(searchByName,StatusCodes.Ongoing, this.managerId, this.currentPage, this.itemsPerPage).subscribe({
        next: (data) => {
          this.incomingRequestdata = data.employeeRequest.map((request: any) => {
            return {
              ...request,
              date: this.datePipe.transform(request.date, 'dd/MM/yyyy'),
              employeeNameAndEmail: `${request.employeeName}\n${request.email}`
            };
          });
          console.log("employee request search by name list");
          console.log(data);
          console.log(this.incomingRequestdata);
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
}
