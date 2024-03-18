import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';

@Component({
  selector: 'app-travel-admin-waiting-requests',
  templateUrl: './travel-admin-waiting-requests.component.html',
  styleUrls: ['./travel-admin-waiting-requests.component.css']
})
export class TravelAdminWaitingRequestsComponent {

  private subscription : Subscription | any

  tableHeaders: string[] = ['Request ID', 'Employee', 'Project Code', 'Date','Mode','Priority'];
  fieldsToDisplay: string[] = ['requestId', 'employeeName', 'projectCode','createdOn','travelTypeName','priorityName'];
  incomingRequestdata:any[] = [];
  requestId: number = 0;
  row: any;
  clickable: boolean = false
  requestData: any[] = [];
  itemsPerPage = 10;
  totalItems = 0;
  currentPage = 1;

  constructor(private travelAdminTravelRequestService: TravelAdminTravelRequestsService, private commonService: CommonAPIService,
    private datePipe : DatePipe, 
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    this.subscription = this.travelAdminTravelRequestService.getWaitingOrSelectedRequests('PE','WT',this.currentPage, this.itemsPerPage).subscribe({
      next: (data) => {
        this.incomingRequestdata = data.travelRequest.map((request: any) => {
          return {
            ...request,
            createdOn: this.datePipe.transform(request.createdOn,'dd/MM/yyyy')
          }
        });  
        console.log(this.incomingRequestdata)      
      },
      error: (error: Error) => {
        console.log("Error while fetching requests")
        console.log(error.message)
      },
      complete: () => {
        console.log("Requests fetching completed")
      }
    })
  }

  selectedRow(row: any){
    this.requestId = row.requestId;
    console.log('requestId:' + this.requestId)
    this.router.navigate(['view_travel_options'],{
      relativeTo: this.activatedRoute,
      queryParams: {requestId: this.requestId}
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
