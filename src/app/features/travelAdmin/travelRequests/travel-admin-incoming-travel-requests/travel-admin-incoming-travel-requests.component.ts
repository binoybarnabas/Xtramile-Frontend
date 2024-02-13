import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TravelRequestCardComponent } from 'src/app/components/ui/travel-request-card/travel-request-card.component';
import { TravelRequestCardModalComponent } from 'src/app/components/ui/travel-request-card-modal/travel-request-card-modal.component';

@Component({
  selector: 'app-travel-admin-incoming-travel-requests',
  templateUrl: './travel-admin-incoming-travel-requests.component.html',
  styleUrls: ['./travel-admin-incoming-travel-requests.component.css']
})
export class TravelAdminIncomingTravelRequestsComponent {
  tableHeaders: string[] = ['Request ID', 'Employee', 'Project Code', 'Date', 'Mode', 'Priority', 'Status'];
  fieldsToDisplay: string[] = ['requestId', 'employeeName', 'projectCode', 'createdOn', 'travelTypeName', 'priorityName', 'statusName'];
  incomingRequestdata: any[] = [];
  selectedRow: any | null = null;
  requestId: number = 0;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  bsModalRef!: BsModalRef;
  constructor(private apiservice: TravelAdminTravelRequestsService, private router: Router, private modalService: BsModalService,
  ) {

  }
  ngOnInit() {
    //api service to receive all incoming requests.

    this.apiservice.getIncomingRequests(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.incomingRequestdata = data.travelRequest;
      this.totalItems = data.pageCount();
    });

  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.apiservice.getIncomingRequests(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.incomingRequestdata = data.travelRequest;
      this.totalItems = data.pageCount();
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



  // selectRow(requestId:number){
  //   this.selectedRow[requestId] = requestId;
  //   console.log(requestId);
  //   const queryParams = {requestId:requestId}
  //   this.router.navigate(['traveladmin/requestdetail'],{ queryParams: queryParams });
  // }
}
