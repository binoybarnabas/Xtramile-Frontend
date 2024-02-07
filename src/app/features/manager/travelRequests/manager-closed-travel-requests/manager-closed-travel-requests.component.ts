import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-manager-closed-travel-requests',
  templateUrl: './manager-closed-travel-requests.component.html',
  styleUrls: ['./manager-closed-travel-requests.component.css']
})
export class ManagerClosedTravelRequestsComponent {
  constructor( private apiService: ManagerTravelRequestsService,private router:Router)
  {}
 
  travelRequest= []
 
  managerId = 9; // to check the data
  itemsPerPage = 10;
  totalItems = 0;
  currentPage = 1;
  tableHeaders=['RequestID','Employee','ProjectCode','Date','Status'] ;
  dataHeaders=['requestId','employee','projectCode','date','status'] ;
 
  ngOnInit(){
    this.getManagerClosedRequests();
  }
 
 
  getManagerClosedRequests(){
    this.apiService.getManagerClosedRequest(this.managerId,this.currentPage,this.itemsPerPage).subscribe({
      next: (data) => {
        this.travelRequest = data.employeeRequest;
        this.totalItems= data.totalCount;
 
        console.log(data);
        console.log(this.travelRequest);
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
