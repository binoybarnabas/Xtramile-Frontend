import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TravelRequestCardModalComponent } from 'src/app/components/ui/travel-request-card-modal/travel-request-card-modal.component';
import { CustomLoaderService } from 'src/app/services/helperServices/commonUIServices/custom-loader-service/custom-loader.service';import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-travel-admin-ongoing-travel-requests',
  templateUrl: './travel-admin-ongoing-travel-requests.component.html',
  styleUrls: ['./travel-admin-ongoing-travel-requests.component.css']
})
export class TravelAdminOngoingTravelRequestsComponent {

  pageHeading: string = 'Ongoing Travel';
  tableHeaders: string[] = ['Request Code','Requested By','Project Code','From','To','Departure Date', 'Return Date', 'Pickup', 'Ticket Status', 'Trip Status'];
  fieldsToDisplay: string[] = ['requestCode', 'name','projectCode', 'from','to','departureDate', 'returnDate', 'pickUpRequested', 'ticketStatus', 'tripStatus'];
  requestData: any[] = [];
  requestId: number = 0;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  selectedRow: any;
  bsModalRef: any;
  modalService: any;

  constructor(private apiservice: TravelAdminTravelRequestsService, private router: Router, private datePipe: DatePipe, private loaderService : CustomLoaderService){}

  ngOnInit(){
    this.fetchTravelRequest();
  }

  pageChanged(event: any): void {

    this.loaderService.show();

    this.currentPage = event.page;
    this.apiservice.getOngoingTravel(this.currentPage, this.pageSize).subscribe((data: any) => {

      this.loaderService.hide();

      this.requestData = this.formatData(data.ongoingTravel);
      this.totalItems = data.pageCount;
    });
  }

  fetchTravelRequest(){

    this.loaderService.show();

    this.apiservice.getOngoingTravel(this.currentPage, this.pageSize).subscribe((data: any) => {

      this.loaderService.hide();

      this.requestData = this.formatData(data.ongoingTravel);
      this.totalItems = data.pageCount;
    });
  }
  
  handleSelectedRow(row: any) {
    this.selectedRow = row;
    console.log(this.selectedRow.requestId)
    this.requestId = this.selectedRow.requestId
    

    const initialState = {
      requestId: this.selectedRow.requestId
    };
    const queryParams = { requestId: this.requestId }
    this.router.navigate(['traveladmin/requestdetail'],{ queryParams: queryParams });
    this.bsModalRef = this.modalService.show(TravelRequestCardModalComponent, { initialState });
    this.bsModalRef.content.onClose.subscribe((result: any) => {
      // Handle the result from the modal if needed
      console.log('Modal result:', result);
      // You can perform actions with the result data here
    });

  }

  formatData(data: any[]): any[] {
    //using DatePipe to convert the date into dd/LL/yyyy format
    const datePipe = new DatePipe('en-US');
    return data.map(item => ({
      ...item,
      departureDate: datePipe.transform(item.departureDate, 'dd/LL/yyyy'),
      returnDate: item.returnDate ? datePipe.transform(item.returnDate, 'dd/LL/yyyy'): ''
    }));
  }


}
