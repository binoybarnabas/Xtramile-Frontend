import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CustomConfirmationModalComponent } from 'src/app/components/ui/generalUIComponents/custom-confirmation-modal/custom-confirmation-modal.component';
import { TravelRequestDetailViewModel } from 'src/app/models/dtoModels/iTravelRequestDetails';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { TravelRequestUiService } from 'src/app/services/helperServices/requestServices/travel-request-ui.service';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';

@Component({
  selector: 'app-traveller-request-progress-details',
  templateUrl: './traveller-request-progress-details.component.html',
  styleUrls: ['./traveller-request-progress-details.component.css'],
})
export class TravellerRequestProgressDetailsComponent {
  pageHeading: string = 'Request Details';

  withdrawBtnText: string = 'Withdraw';
  extendBtnText: string = 'Request for Extension';
  completeBtnText: string = 'Mark as Completed';

  //update
  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private managerTravelRequest: ManagerTravelRequestsService,
    private requestService: RequestService,
    private requestUiService : TravelRequestUiService,
    private modalService: BsModalService
  ) {}

  travelRequestDetails!: TravelRequestDetailViewModel;
  ticketStatus: string = '';
  requestStatus: string = '';
  nameOfTraveler : string ='';

  steps: { label: string, description: string, status: 'completed' | 'current' | 'pending' | 'rejected', timestamp: string}[] = []; 

  ngOnInit() {
    this.getRequestDetails();
  }

  requestId: number = -1;

  getRequestDetails() {
    this.route.queryParams.subscribe((params) => {
      this.requestId = params['requestId'];
      this.managerTravelRequest.GetTravelRequest(this.requestId).subscribe({
        next: (data) => {
          data.departureDate =
            this.datePipe.transform(data.departureDate, 'dd/MM/yyyy') || ' ';
          data.returnDate =
            this.datePipe.transform(data.returnDate, 'dd/MM/yyyy') || ' ';
          this.travelRequestDetails = data;
          this.ticketStatus = data.ticketStatus;

          this.requestService.getStatusName(this.requestId).subscribe({
            next: (statusData) => {
              this.requestStatus = statusData;
              this.initializeStausStepChart();
            },
          });
        },
      });
    });
  }


  initializeStausStepChart(){

    this.steps = [
      { label: 'Request Initiated', description: 'Travel Requested Initiated', status: 'current' , timestamp: '29th May 24' },
      { label: 'Forwarded by Manager', description: '', status: 'pending' , timestamp: ''},
      { label: 'Travel Options Sent', description: '', status: 'pending' , timestamp: ''},
      { label: 'Travel Option Selected', description: '', status: 'pending' , timestamp: ''},
      { label: 'Approved by Travel Admin', description: '', status: 'pending' , timestamp: ''},
      { label: 'Ticket Sent', description: '', status: 'pending' , timestamp: ''},
      { label: 'Trip Started', description: '', status: 'pending' , timestamp: ''},
      { label: 'Trip Completed', description: '', status: 'pending' , timestamp: ''},
      { label: 'Request Closed', description: '', status: 'pending' , timestamp: ''}
    ];

    if(this.requestStatus === 'Approved by RM'){
      this.steps[0] = { label: 'Request Initiated', description: 'Travel Request Initiated', status: 'completed' , timestamp: '29th May 24' };
      this.steps[1] = { label: 'Forwarded by Manager', description: 'Travel Request Forwarded by ManagerName', status: 'current' , timestamp: '29th May 24' };
    }

    else if(this.requestStatus === 'Waiting'){
      this.steps[0] = { label: 'Request Initiated', description: 'Travel Request Initiated', status: 'completed' , timestamp: '29th May 24' };
      this.steps[1] = { label: 'Forwarded by Manager', description: 'Travel Request Forwarded by ManagerName', status: 'completed' , timestamp: '29th May 24' };
      this.steps[2] = { label: 'Travel Options Sent', description: 'Travel Options Sent to the Manager by TravelAdminNAme', status: 'current' , timestamp: '29th May 24' };
    }

    else if(this.requestStatus === 'Selected'){
      this.steps[0] = { label: 'Request Initiated', description: 'Travel Request Initiated', status: 'completed' , timestamp: '29th May 24' };
      this.steps[1] = { label: 'Forwarded by Manager', description: 'Travel Request Forwarded by ManagerName', status: 'completed' , timestamp: '29th May 24' };
      this.steps[2] = { label: 'Travel Options Sent', description: 'Travel Options Sent to the Manager by TravelAdminName', status: 'completed' , timestamp: '29th May 24' };
      this.steps[3] = { label: 'Travel Option Selected', description: 'Travel Options Selected by ManagerNAme', status: 'current' , timestamp: '29th May 24' };
    }
    else if(this.requestStatus === 'Approved by TA'){
      this.steps[0] = { label: 'Request Initiated', description: 'Travel Request Initiated', status: 'completed' , timestamp: '29th May 24' };
      this.steps[1] = { label: 'Forwarded by Manager', description: 'Travel Request Forwarded by ManagerName', status: 'completed' , timestamp: '29th May 24' };
      this.steps[2] = { label: 'Travel Options Sent', description: 'Travel Options Sent to the Manager by TravelAdminNAme', status: 'completed' , timestamp: '29th May 24' };
      this.steps[3] = { label: 'Travel Option Selected', description: 'Travel Options Selected by ManagerName', status: 'completed' , timestamp: '29th May 24' };
      this.steps[4] = { label: 'Approved by Travel Admin', description: 'Travel Request Approved by TravelAdmin Name', status: 'current' , timestamp: '29th May 24' };
    }
    if(this.ticketStatus === 'Attached'){
      this.steps[0] = { label: 'Request Initiated', description: 'Travel Request Initiated', status: 'completed' , timestamp: '29th May 24' };
      this.steps[1] = { label: 'Forwarded by Manager', description: 'Travel Request Forwarded by ManagerName', status: 'completed' , timestamp: '29th May 24' };
      this.steps[2] = { label: 'Travel Options Sent', description: 'Travel Options Sent to the Manager by TravelAdminNAme', status: 'completed' , timestamp: '29th May 24' };
      this.steps[3] = { label: 'Travel Option Selected', description: 'Travel Options Selected by ManagerName', status: 'completed' , timestamp: '29th May 24' };
      this.steps[4] = { label: 'Approved by Travel Admin', description: 'Travel Request Approved by TravelAdmin Name', status: 'completed' , timestamp: '29th May 24' };
      this.steps[5] = { label: 'Ticket Sent', description: 'Ticket Details Sent', status: 'current' , timestamp: '29th May 24' };
    }

    

  }

  


  //withdraw travel request
  onWithDrawBtnClick(){

    this.requestUiService.openWithdrawalConfirmationModal(this.requestId);

  }

  //request for extension
  onExtendBtnClick(){

  }

  //mark as completed
  onCompleteBtnClick(){
    
    const initialState = {
      mainText: 'Confirm Completion',
      description: 'Are you sure you want to mark this travel as completed? This action cannot be undone. Please note that the request will be closed by the travel admin once all settlements are finalized.',
      cancelBtnText: 'Cancel',
      confirmBtnText: 'Submit',
      confirmBtnColor: '#9a4cfa'
    };
  
    const modalRef = this.modalService.show(CustomConfirmationModalComponent, {
      initialState,
    });  
    modalRef.content?.cancel.subscribe(() => {
      

    });
  
    modalRef.content?.confirm.subscribe(() => {
      this.requestUiService.completeTravelRequest(this.requestId);
    });
  }

  //eof
}

