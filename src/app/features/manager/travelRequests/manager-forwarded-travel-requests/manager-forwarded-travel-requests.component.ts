import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/services/interfaces/iuserData';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-manager-forwarded-travel-requests',
  templateUrl: './manager-forwarded-travel-requests.component.html',
  styleUrls: ['./manager-forwarded-travel-requests.component.css']
})
export class ManagerForwardedTravelRequestsComponent {
  travelRequest= []
 
  managerId : number; // to check the data
  userData : UserData
  itemsPerPage = 10;
  totalItems = 0;
  currentPage = 1;
  tableHeaders=['RequestID','Employee','ProjectCode','Date','Status'] ;
  dataHeaders=['requestId','employee','projectCode','date','status'] ;
  constructor( private apiService: ManagerTravelRequestsService,private router:Router)
  {
    const storedUserData = localStorage.getItem('userData');
    this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;
    this.managerId = this.userData.empId;
    this.apiService.managerId = this.managerId;

  }
 
  ngOnInit(){
    this.getManagerForwardRequests();
  }
 
 
  getManagerForwardRequests(){
    console.log("inside get forward req")
    this.apiService.getManagerForwardedRequest(this.managerId,this.currentPage,this.itemsPerPage).subscribe({
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
    this.getManagerForwardRequests();
  }
}
