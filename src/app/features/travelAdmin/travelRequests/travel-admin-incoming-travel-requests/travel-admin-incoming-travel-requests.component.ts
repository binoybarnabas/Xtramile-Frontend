import { DatePipe } from '@angular/common';
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
  constructor(private apiservice: TravelAdminTravelRequestsService, private router: Router, private datePipe: DatePipe){
    
  }
  ngOnInit(){
    //api service to receive all incoming requests.
    this.apiservice.getIncomingRequests().subscribe((data: any[]) => {
      data.forEach((request) => {
        request.createdOn = this.datePipe.transform(request.createdOn,'dd/LL/yyyy')
      })
      this.incomingRequestdata = data;
    });
  }
  //to handle the row emitted from child component and add requestId as query parameter
  handleSelectedRow(row:any){
    this.selectedRow = row;
    console.log(this.selectedRow.requestId)
    this.requestId = this.selectedRow.requestId
    const queryParams = {requestId:this.requestId}
    this.router.navigate(['traveladmin/requestdetail'],{ queryParams: queryParams });
  }
}
