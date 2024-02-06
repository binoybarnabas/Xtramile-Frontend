import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-manager-forwarded-travel-requests',
  templateUrl: './manager-forwarded-travel-requests.component.html',
  styleUrls: ['./manager-forwarded-travel-requests.component.css']
})
export class ManagerForwardedTravelRequestsComponent {

  travelRequest: any[] | undefined

  managerId = 9; // to check the data
  itemsPerPage = 10;
  totalItems = 0;
  currentPage = 1;
  constructor( private apiService: ManagerTravelRequestsService,private router:Router)
  {}

  ngOnInit(){
    this.getManagerForwardRequests();
  }


  getManagerForwardRequests(){
    this.apiService.getManagerForwardedRequest(this.managerId,this.currentPage,this.itemsPerPage).subscribe({
      next: (data) => {
        this.travelRequest = data.employee;
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
    this.getManagerForwardRequests();
  }

  }
