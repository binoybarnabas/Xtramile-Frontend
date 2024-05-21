import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { CustomLoaderService } from 'src/app/services/commonUIServices/custom-loader-service/custom-loader.service';

@Component({
  selector: 'app-travel-admin-waiting-requests',
  templateUrl: './travel-admin-waiting-requests.component.html',
  styleUrls: ['./travel-admin-waiting-requests.component.css']
})
export class TravelAdminWaitingRequestsComponent {

  private subscription : Subscription | any

  tableHeaders: string[] = ['Request Code', 'Requested By', 'Project Code','From','To','Date of Travel', 'Options sent on'];
  fieldsToDisplay: string[] = ['requestCode', 'employeeName', 'projectCode','from','to','departureDate','approvalDate'];
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
    private activatedRoute: ActivatedRoute, private loaderService : CustomLoaderService) {}

  ngOnInit(){
    this.getRequests();
  }

  getRequests(){

    this.loaderService.show();

    this.subscription = this.travelAdminTravelRequestService.getWaitingOrSelectedRequests('PE','WT',this.currentPage, this.itemsPerPage).subscribe({
      next: (data) => {

        this.loaderService.hide();

        this.incomingRequestdata = data.items.map((request: any) => {
          return {
            ...request,
            departureDate: this.datePipe.transform(request.departureDate,'dd/MM/yyyy'),
            approvalDate:this.datePipe.transform(request.approvalDate,'dd/MM/yyyy')
          }
        }); 
        console.log(this.incomingRequestdata)
        this.totalItems = data.totalCount      
      },
      error: (error: Error) => {

        this.loaderService.hide();

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
    // console.log('requestId:' + this.requestId)
    // this.router.navigate(['view_travel_options'],{
    //   relativeTo: this.activatedRoute,
    //   queryParams: {requestId: this.requestId}
    // })
    const queryParams = { requestId: this.requestId };
    this.router.navigate(['traveladmin/requestdetail'], {
      queryParams: queryParams,
    });
  }

  onPageChange(event: any){
    this.currentPage = event.page;
    this.getRequests();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}