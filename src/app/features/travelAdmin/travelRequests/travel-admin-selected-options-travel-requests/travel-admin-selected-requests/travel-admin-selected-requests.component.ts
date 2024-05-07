import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-travel-admin-selected-requests',
  templateUrl: './travel-admin-selected-requests.component.html',
  styleUrls: ['./travel-admin-selected-requests.component.css']
})
export class TravelAdminSelectedRequestsComponent {

    
  private subscription : Subscription | any

  tableHeaders: string[] = ['Request Code', 'Employee', 'Project Code', 'Date','Mode'];
  fieldsToDisplay: string[] = ['requestCode', 'employeeName', 'projectCode','createdOn','travelTypeName'];
  incomingRequestdata:any[] = [];
  requestData: any[] = [];
  itemsPerPage = 10;
  totalItems = 0;
  currentPage = 1;

  requestId: number = 0;

  constructor(private travelAdminTravelRequestService: TravelAdminTravelRequestsService, private datePipe : DatePipe,
    private router: Router,private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    this.getRequests();
  }

  getRequests(){
    this.subscription = this.travelAdminTravelRequestService.getWaitingOrSelectedRequests('PE','SD',this.currentPage, this.itemsPerPage).subscribe({
      next: (data) => {
        this.incomingRequestdata = data.items.map((request: any) => {
          return {
            ...request,
            createdOn: this.datePipe.transform(request.createdOn,'dd/MM/yyyy')
          }
        });  
        this.totalItems = data.totalCount;
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
    this.router.navigate(['view_selected_options'],{
      relativeTo: this.activatedRoute,
      queryParams:{ requestId: this.requestId,
                    IsSelectedPage:true
                  }
    })
  }

  onPageChange(event: any){
    this.currentPage = event.page;
    this.getRequests();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
