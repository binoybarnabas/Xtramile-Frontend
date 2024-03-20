import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TravelRequestCardComponent } from 'src/app/components/ui/travel-request-card/travel-request-card.component';
import { TravelRequestCardModalComponent } from 'src/app/components/ui/travel-request-card-modal/travel-request-card-modal.component';

@Component({
  selector: 'app-travel-admin-incoming-travel-requests',
  templateUrl: './travel-admin-incoming-travel-requests.component.html',
  styleUrls: ['./travel-admin-incoming-travel-requests.component.css']
})
export class TravelAdminIncomingTravelRequestsComponent {

  pageHeading: string = "Incoming Requests";

  tableHeaders: string[] = ['Request ID', 'Employee', 'Project Code', 'Date', 'Mode', 'Priority', 'Status'];
  fieldsToDisplay: string[] = ['requestId', 'employeeName', 'projectCode', 'createdOn', 'travelTypeName', 'priorityName', 'statusName'];
  incomingRequestdata: any[] = [];

  requestData: any[] = [];
  selectedRow: any | null = null;
  requestId: number = 0;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  bsModalRef!: BsModalRef;



  selectedDate!: Date;
  searchByName!: string;
  sqlDatetimeFormat!: string;
  selectedSortOption!: string;
  // managerId : number; // to check the data
  // userData : UserData

  //get the selected date and filter data based on selected dates
  handleDateSelection(selectedDate: Date): void {
    //To convert date from standard js Date format to YYYY-MM-DD format
    this.sqlDatetimeFormat = selectedDate.toISOString().slice(0, 10);
    this.apiservice.getAllRequestByDate(this.sqlDatetimeFormat).subscribe({
      next: (data) => {
        this.requestData = data.map((request: any) => {
          const priorityName = request.priorityName === 'Null' ? 'Not Set' : request.priorityName;
          return {
            ...request,
            createdOn: this.datePipe.transform(request.createdOn, 'dd/MM/yyyy'),
            priorityName: priorityName
          };
        });
        console.log(this.requestData)
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
    if (searchByName == '') {
      this.fetchEmployeeRequest();
    }

    this.apiservice.getAllRequestByEmployeeName(searchByName).subscribe({
      next: (data: any) => {
        this.requestData = data.map((request: any) => {
          const priorityName = request.priorityName === 'Null' ? 'Not Set' : request.priorityName;
          return {
            ...request,
            createdOn: this.datePipe.transform(request.createdOn, 'dd/MM/yyyy'),
            priorityName: priorityName
          };
        });
        console.log("employee request search by name list");
        console.log(data);
        console.log(this.requestData);
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


  // Fetch all the employee requests
  fetchEmployeeRequest() {
    this.apiservice.getIncomingRequests(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.requestData = data.travelRequest.map((request: any) => {
        const priorityName = request.priorityName === 'Null' ? 'Not Set' : request.priorityName;
        return {
          ...request,
          createdOn: this.datePipe.transform(request.createdOn, 'dd/MM/yyyy'),
          priorityName: priorityName
        };
      });
      this.totalItems = data.pageCount;
    });
  }


  // Fetch all employee requests when SeeAll button is pressed
  seeAllRequest() {
    this.fetchEmployeeRequest();
  }


  handleSeeAllClick(): void {
    // Handle the "See All" click
    this.fetchEmployeeRequest();
  }

  //Sort employee requests based on the selected option
  sortData(option: string): void {
    if (option == "name") {
      this.apiservice.getAllRequestSortByEmployeeName(this.currentPage, this.pageSize).subscribe({
        next: (data: any) => {
          console.log(data);
          this.requestData = data.travelRequest.map((request: any) => {
            const priorityName = request.priorityName === 'Null' ? 'Not Set' : request.priorityName;
            return {
              ...request,
              createdOn: this.datePipe.transform(request.createdOn, 'dd/MM/yyyy'),
              priorityName: priorityName
            };
          });
          this.totalItems = data.totalPages;
        },
        error: (error: any) => {
          console.log("Error fetching the requests", error)
        }
      });
    }
    if (option == "date") {
      this.apiservice.getAllRequestSortByDate(this.currentPage, this.pageSize).subscribe({
        next: (data: any) => {
          console.log(data);
          this.requestData = data.travelRequest.map((request: any) => {
            const priorityName = request.priorityName === 'Null' ? 'Not Set' : request.priorityName;
            return {
              ...request,
              createdOn: this.datePipe.transform(request.createdOn, 'dd/MM/yyyy'),
              priorityName: priorityName
            };
          });
          this.totalItems = data.totalPages;
        },
        error: (error: any) => {
          console.log("Error fetching the requests", error)
        }
      });
    }
  }

  //needs to be done
  handleSortOptionSelection(selectedSortOption: string): void {
    // Handle the selected sort option
    console.log('Selected Sort Option:', selectedSortOption);
    this.selectedSortOption = selectedSortOption;
    this.sortData(selectedSortOption);
  }


  constructor(private apiservice: TravelAdminTravelRequestsService, private router: Router, private datePipe: DatePipe, private modalService: BsModalService,
  ) {

  }


  ngOnInit() {
    //api service to receive all incoming requests.

    this.apiservice.getIncomingRequests(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.requestData = data.travelRequest.map((request: any) => {
        const priorityName = request.priorityName === 'Null' ? 'Not Set' : request.priorityName;
        return {
          ...request,
          createdOn: this.datePipe.transform(request.createdOn, 'dd/MM/yyyy'),
          priorityName: priorityName

        };
      });
      console.log(this.requestData)
      this.totalItems = data.pageCount;
    });

  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.apiservice.getIncomingRequests(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.incomingRequestdata = data.travelRequest;

      this.requestData = data.travelRequest.map((request: any) => {
        const priorityName = request.priorityName === 'Null' ? 'Not Set' : request.priorityName;
        return {
          ...request,
          createdOn: this.datePipe.transform(request.createdOn, 'dd/MM/yyyy'),
          priorityName: priorityName
        };
      });
      this.totalItems = data.pageCount;
    });
  }


  handleSelectedRow(row: any) {
    this.selectedRow = row;
    console.log(this.selectedRow.requestId)
    this.requestId = this.selectedRow.requestId
    //const queryParams = { requestId: this.requestId }
    //this.router.navigate(['traveladmin/requestdetail'],{ queryParams: queryParams });

    const initialState = {
      requestId: this.selectedRow.requestId
    };

    this.bsModalRef = this.modalService.show(TravelRequestCardModalComponent, { initialState });
    this.bsModalRef.content.onClose.subscribe((result: any) => {
      // Handle the result from the modal if needed
      console.log('Modal result:', result);
      // You can perform actions with the result data here
    });

  }



  // selectRow(requestId:number){
  //   this.selectedRow[requestId] = requestId;
  //   console.log(requestId);
  //   const queryParams = {requestId:requestId}
  //   this.router.navigate(['traveladmin/requestdetail'],{ queryParams: queryParams });
  // }
}
