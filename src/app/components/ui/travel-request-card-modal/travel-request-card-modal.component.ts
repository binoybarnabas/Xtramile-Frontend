import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { TravelRequestDetailViewModel } from 'src/app/services/interfaces/iTravelRequestDetails';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { local } from 'd3';
import { DatePipe } from '@angular/common';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { CustomToastService } from 'src/app/services/toastServices/custom-toast.service';

@Component({
  selector: 'app-travel-request-card-modal',
  templateUrl: './travel-request-card-modal.component.html',
  styleUrls: ['./travel-request-card-modal.component.css'],
})
export class TravelRequestCardModalComponent {
  private _requestId!: number;
  primaryStatus: string = 'Denied';

  status: string = '';

  @Input()
  set requestId(value: number) {
    this._requestId = value;
    // console.log(this._requestId)
  }

  travelRequestDetailViewModel!: TravelRequestDetailViewModel;

  //isProceedBtnClicked : boolean = true;
  visibleSectionName: string = 'request_details';
  visibleOptionTabId: number = 0;
  isOptionCardSelected: boolean = false;
  selectedOptionId: number = -1;

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private commonApiService: CommonAPIService,
    private managerTravelRequest: ManagerTravelRequestsService,
    private requestService: RequestService,
    private modalService: BsModalService,
    private toastService:CustomToastService
  ) {}

  ngOnInit() {
    this.commonApiService.GetTravelRequestById(this._requestId).subscribe({
      next: (data) => {
        this.travelRequestDetailViewModel = data;
        console.log(this.travelRequestDetailViewModel);
        console.log(this.travelRequestDetailViewModel.requestId);
      },
      error: (error: Error) => {
        console.log('problems in fetching data');
      },
      complete: () => {
        console.log('get request by id is done');
      },
    });

    this.requestService.getStatusName(this._requestId).subscribe({
      next: (data) => {
        console.log(this._requestId);
        console.log(data);
        this.status = data;
        console.log(this.status);
      },
      complete: () => {},
    });
  }
  navigateHandleUserSelection() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userDataParsed = JSON.parse(userData);

      if (
        userDataParsed.role == 'Manager' &&
        userDataParsed.department == 'TA'
      ) {
        this.navigateToAddOptions();
      } else if (userDataParsed.role == 'Manager') {
        this.navigateToSetPriority();
      }
    }
  }

  //On Travel Click Proceed Button
  navigateToAddOptions() {
    const queryParams = { requestId: this._requestId };
    this.router.navigate(['traveladmin/requestdetail'], {
      queryParams: queryParams,
    });
    this.bsModalRef.hide();
  }

  navigateToSetPriority() {
    const queryParams = { requestId: this._requestId };
    this.router.navigate(['manager/requestdetail'], {
      queryParams: queryParams,
    });
    this.bsModalRef.hide();
  }

  //Manager forwarding the travel request form
  onManagerForwardTravelRequestForm() {
    //Should call a PATCH method to set priority of the request
    //console.log(this.travelRequestForm.value.priority);

    this.managerTravelRequest
      .setRequestPriorityAndApprove(this.travelRequestDetailViewModel.requestId)
      .subscribe({
        next: (data) => {
          console.log(data);
          // window.alert(this.travelRequestDetailViewModel.requestId + "  " + this.travelRequestForm.value.priority);
          //  console.log(this.travelRequestDetailViewModel.requestId + "  " + this.travelRequestForm.value.priority);
          // Redirect to another page
          //alert("Approved");
          this.toastService.showToast("Travel request Approved");
          this.router.navigate(['/manager/dashboard']);
        },
        complete: () => {
          //this.toastr.success('Request approved!', 'Success');
          // this.toastService.showToast("Travel Request Approved!")
          this.bsModalRef.hide();
        },
      });
  }

  onProceedButtonClick() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userDataParsed = JSON.parse(userData);

      if (
        userDataParsed.role == 'Manager' &&
        userDataParsed.department == 'TA'
      ) {
        //this.navigateToAddOptions();
        this.visibleSectionName = 'add_travel_option';
      } else if (userDataParsed.role == 'Manager') {
        this.onManagerForwardTravelRequestForm();
      }
    }
  }

  //method to move to another section
  moveToSection(sectionName: string) {
    this.visibleSectionName = sectionName;
  }

  //method to switch tabs
  switchOptionTab(newTabId: number) {
    this.visibleOptionTabId = newTabId;
  }

  //toggle visibility of delete btn and add btn
  onOptionCardSelected(optionId: number) {
    if (this.isOptionCardSelected) {
      this.isOptionCardSelected = false;
      this.selectedOptionId = -1;
    } else {
      this.isOptionCardSelected = true;
      this.selectedOptionId = optionId;
    }
  }

  openAddOptionModal() {
    const initialState = {
      requestId: this.travelRequestDetailViewModel.requestId,
    };

    this.bsModalRef = this.modalService.show(TextEditorComponent, {
      initialState,
    });
    this.bsModalRef.content.onClose.subscribe((result: any) => {
      // Handle the result from the modal if needed
      console.log('Modal result:', result);

      // You can perform actions with the result data here
    });
  }
}
