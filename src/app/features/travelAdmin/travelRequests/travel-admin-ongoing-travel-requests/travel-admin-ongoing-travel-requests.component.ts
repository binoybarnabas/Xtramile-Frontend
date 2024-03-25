import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TravelRequestCardModalComponent } from 'src/app/components/ui/travel-request-card-modal/travel-request-card-modal.component';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-travel-admin-ongoing-travel-requests',
  templateUrl: './travel-admin-ongoing-travel-requests.component.html',
  styleUrls: ['./travel-admin-ongoing-travel-requests.component.css']
})
export class TravelAdminOngoingTravelRequestsComponent {

  pageHeading: string = 'Ongoing Travel';
  tableHeaders: string[] = ['Request ID','Project Code','Project Name','Employee','Source City','Destination City'];
  fieldsToDisplay: string[] = ['requestId', 'projectCode','projectName', 'name','sourceCity','destinationCity'];
  requestData: any[] = [];
  requestId: number = 0;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  selectedRow: any;
  bsModalRef: any;
  modalService: any;

  constructor(private apiservice: TravelAdminTravelRequestsService, private router: Router, private datePipe: DatePipe){}

  ngOnInit(){
    this.fetchTravelRequest();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.apiservice.getIncomingRequests(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.requestData = data.ongoingTravel;
      this.totalItems = data.pageCount;
    });
  }

  fetchTravelRequest(){
    this.apiservice.getOngoingTravel(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.requestData = data.ongoingTravel;
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

}
