import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-travel-admin-incoming-travel-requests',
  templateUrl: './travel-admin-incoming-travel-requests.component.html',
  styleUrls: ['./travel-admin-incoming-travel-requests.component.css']
})
export class TravelAdminIncomingTravelRequestsComponent {
  tableHeaders: string[] = ['Request ID', 'Employee', 'Project Code', 'Date','Mode','Priority','Status'];
  fieldsToDisplay: string[] = ['requestId', 'employeeName', 'projectCode','createdOn','travelTypeName','priorityName','statusName'];
  incomingRequestdata:any[] = [];
  selectedRow:any | null = null;
  requestId: number = 0;
  currentPage=1;
  pageSize=10;
  totalItems=0;
  constructor(private apiservice: TravelAdminTravelRequestsService, private router: Router){
    
  }
  ngOnInit(){
    //api service to receive all incoming requests.
        
        this.apiservice.getIncomingRequests(this.currentPage,this.pageSize).subscribe((data: any) =>
        {
          this.incomingRequestdata = data.travelRequest;
          this.totalItems= data.totalCount();
        });
     
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.apiservice.getIncomingRequests(this.currentPage,this.pageSize).subscribe((data: any) =>
    {
      this.incomingRequestdata = data.travelRequest;
      this.totalItems= data.totalCount();
    });
  }
 

  handleSelectedRow(row:any){
    this.selectedRow = row;
    console.log(this.selectedRow.requestId)
    this.requestId = this.selectedRow.requestId
    const queryParams = {requestId:this.requestId}
    this.router.navigate(['traveladmin/requestdetail'],{ queryParams: queryParams });
  }
  // selectRow(requestId:number){
  //   this.selectedRow[requestId] = requestId;
  //   console.log(requestId);
  //   const queryParams = {requestId:requestId}
  //   this.router.navigate(['traveladmin/requestdetail'],{ queryParams: queryParams });
  // }
}
