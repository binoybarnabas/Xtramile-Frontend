import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomLoaderComponent } from 'src/app/components/ui/custom-loader/custom-loader.component';
import { CustomLoaderService } from 'src/app/services/commonUIServices/custom-loader-service/custom-loader.service';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-manager-closed-travel-requests',
  templateUrl: './manager-closed-travel-requests.component.html',
  styleUrls: ['./manager-closed-travel-requests.component.css']
})
export class ManagerClosedTravelRequestsComponent {
  pageHeading: string = 'Closed Travel Requests'

  constructor(private apiService: ManagerTravelRequestsService, private router: Router,
    private datePipe: DatePipe, private loaderService : CustomLoaderService
  ) { 
    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData !== null ? JSON.parse(storedUserData) : null;
    this.managerId = userData.empId;
  }

  travelRequest = []

  managerId : number; // to check the data
  itemsPerPage = 10;
  totalItems = 0;
  currentPage = 1;
  tableHeaders = ['Request Code', 'Requested By', 'Project Code','From','To','Requested On', 'Closed On'];
  dataHeaders = ['requestCode', 'employeeNameAndEmail', 'projectCode', 'from', 'to','date','statusDate'];

  ngOnInit() {
    this.getManagerClosedRequests();
  }

  getManagerClosedRequests() {

    this.loaderService.show();

    this.apiService.getManagerClosedRequest(this.managerId, this.currentPage, this.itemsPerPage).subscribe({
      next: (data) => {

        this.loaderService.hide();

        this.travelRequest = data.employeeRequest.map((request: any) => {
          return {
            ...request,
            date: this.datePipe.transform(request.date, 'dd/MM/yyyy'),
            statusDate: this.datePipe.transform(request.statusDate, 'dd/MM/yyyy'),
            employeeNameAndEmail: `${request.employeeName}\n${request.email}`
          };
        });
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle error if needed
      },
    });
  }

  // handle page change event
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getManagerClosedRequests();
  }

}
