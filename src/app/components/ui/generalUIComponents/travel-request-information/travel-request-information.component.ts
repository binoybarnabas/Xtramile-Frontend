import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { EmployeeDetails } from './request';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonAPIService } from 'src/app/services/apiServices/commonAPIServices/common-api.service';
import { RequestStatus } from 'src/app/components/ui/referenceComponents/change-status-button/request-status';
import { UserData } from 'src/app/models/interfaces/iuserData';
import { DescriptionModalComponent } from 'src/app/components/ui/form-components/description-modal/description-modal.component';
import { TravelOptionDetails } from 'src/app/models/interfaces/iTravelOptionDetails';
import { CustomToastService } from 'src/app/services/helperServices/toastServices/custom-toast.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';
import { TabbedOptionViewerComponent } from 'src/app/components/ui/generalUIComponents/tabbed-option-viewer/tabbed-option-viewer.component';
import { CustomConfirmationModalComponent } from 'src/app/components/ui/generalUIComponents/custom-confirmation-modal/custom-confirmation-modal.component';
import { TravelRequestDetailViewModel } from 'src/app/models/dtoModels/iTravelRequestDetails';
import { TravelRequestUiService } from 'src/app/services/helperServices/requestServices/travel-request-ui.service';

@Component({
  selector: 'app-new-travel-request',
  templateUrl: './travel-request-information.component.html',
  styleUrls: ['./travel-request-information.component.css'],
})
export class NewTravelRequestComponent {
  //Employee id
  currentLoggedInUserId: number;

  //Employee details from api
  employeeDetails?: EmployeeDetails;

  //userData based on session values
  userData: UserData;

  travelRequestDetailViewModel!: TravelRequestDetailViewModel;

  //Map to keep data by differenct sections of Travel Request Form
  //Can be used to provide a view to those users who do not want to edit it
  generalInformationsMap = new Map<string, any>();
  tripInformationsMap = new Map<string, any>();
  additionalInformationsMap = new Map<string, any>();

  requestDetailsPageHeading: string = 'TRAVEL REQUEST INFORMATION';

  //action bar items
  rejectBtnText : string = 'Reject'

  backBtnTitle: string = 'Back';
  forwardBtnTitle: string = 'Next';

  //isForwardBtnVisible: boolean = true;
  isSubmitBtnActive: boolean = false;

  totalNavCount: number = 0;
  currentNavIndex: number = 0;

  //sus
  requestStatus!: RequestStatus;

  bsModalRef!: BsModalRef;

  travelOptionsData: TravelOptionDetails[] = [];

  //to identify if its travel admin close request screen
  isCloseVisible: boolean = false;

  optionFileUrl: string = '';

  status: string = '';

  ticketStatus : string ='';

  requestId: number = -1;

  // Function to convert the Map into an array of key-value pairs
  getGeneralInfoMapEntries(): [string, any][] {
    return Array.from(this.generalInformationsMap.entries());
  }

  // Function to convert the Map into an array of key-value pairs
  getTripInfoMapEntries(): [string, any][] {
    return Array.from(this.tripInformationsMap.entries());
  }

  // Function to convert the Map into an array of key-value pairs
  getAdditionalInfoMapEntries(): [string, any][] {
    return Array.from(this.additionalInformationsMap.entries());
  }

  isSideNavBarOpen: any;
  newReqFormSubMenuValue: number;

  leftSectionNavItems: string[] = [];
  currentLoggedInUserRole: string;

  private isFileSubscription!: Subscription;

  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private managerTravelRequest: ManagerTravelRequestsService,
    private router: Router,
    private modalService: BsModalService,
    private commonApiService: CommonAPIService,
    private toastService: CustomToastService,
    private travelRequestUIService: TravelRequestUiService
  ) {
    const storedUserData = localStorage.getItem('userData');

    this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;

    this.currentLoggedInUserId = this.userData?.empId;

    this.newReqFormSubMenuValue = 0;

    //Getting the current Loggedin user based on session value
    this.currentLoggedInUserRole = '';

    const userData = localStorage.getItem('userData');

    if (userData != null) {
      this.userData = JSON.parse(userData);

      switch (this.userData.role) {
        case 'Manager':
          if (this.userData.department == 'TA') {
            this.currentLoggedInUserRole = 'travelAdmin';
            //this.newReqFormSubMenuValue = 4;
          } else if (this.userData.department == 'FD') {
            this.currentLoggedInUserRole = 'financePersonnel';
          } else {
            this.currentLoggedInUserRole = 'manager';
            //this.newReqFormSubMenuValue = 2;
          }
          break;
      }
    }
  }

  changeNewReqFormSubMenuValue(value: number) {
    this.newReqFormSubMenuValue = value;
    this.currentNavIndex = value;

    if (value === this.totalNavCount) {
      if (this.status === 'Selected') {
        this.forwardBtnTitle = 'Confirm';
      } else {
        this.forwardBtnTitle = 'Submit';
      }
    } else {
      this.forwardBtnTitle = 'Next';
    }
  }

  //To Update the New Req Form Sections Based on user roles
  updateNavItemsBasedOnUserRole() {
    switch (this.currentLoggedInUserRole) {
      case 'manager':
        if(this.status === 'Open'){
          this.isSubmitBtnActive = true;
        }
        if (
          this.status === 'Waiting' ||
          this.status === 'Selected' ||
          this.status === 'Approved by TA'
        ) {
          this.leftSectionNavItems = [
            'General Information',
            'Trip Information',
            'Additional Information',
            'Documents Attached',
            'Travel Options',
          ];
          this.totalNavCount = 4;
          this.newReqFormSubMenuValue = 4;
          this.currentNavIndex = 4;
          this.forwardBtnTitle = 'Submit';
        }
  
        else {
          this.leftSectionNavItems = [
            'General Information',
            'Trip Information',
            'Additional Information',
            'Documents Attached',
          ];
          this.totalNavCount = 3;
        }
        break;

      case 'travelAdmin':
        if (this.status === 'Open') {
          this.leftSectionNavItems = [
            'General Information',
            'Trip Information',
            'Additional Information',
            'Documents Attached',
          ];
          this.totalNavCount = 3;
        }
        else if(this.ticketStatus === 'Not Attached'){
          this.newReqFormSubMenuValue = 4;
          this.currentNavIndex = 4;
          this.forwardBtnTitle = 'Send';
        }
        else {
          this.leftSectionNavItems = [
            'General Information',
            'Trip Information',
            'Additional Information',
            'Documents Attached',
            'Travel Options',
          ];
          this.totalNavCount = 4;
          if (this.status === 'Waiting' || this.status === 'Selected') {
            this.newReqFormSubMenuValue = 4;
            this.currentNavIndex = 4;
            this.forwardBtnTitle = 'Confirm';
            this.isSubmitBtnActive = true;
          }
        }
        break;

      case 'financePersonnel':
        this.leftSectionNavItems = [
          'General Information',
          'Trip Information',
          'Additional Information',
          'Per Diem Allocation',
        ];
        this.totalNavCount = 3;
        break;
    }
  }

  // format date from request info
  formatDateTime(dateString: string | undefined): string {
    const formattedDate = this.datePipe.transform(
      dateString,
      'yyyy-MM-dd HH:mm:ss'
    );
    return formattedDate || ''; // Handle potential null value
  }

  //format datetime format for preferred departure time
  formatDate(dateString: string | undefined): string {
    const formattedDate = this.datePipe.transform(dateString, 'yyyy-MM-dd');
    return formattedDate || ''; // Handle potential null value
  }

  //date formatting
  formattedPreferredDepartureTime!: string;
  formattedPreferredDepartureDate!: string;
  formattedPreferredReturnDate!: string;

  travelRequestForm!: FormGroup;

  ngOnInit() {
    this.requestService.getEmployeeDataById(this.currentLoggedInUserId).subscribe({
      next: (data) => {
        this.employeeDetails = data;
        console.log(this.employeeDetails);
      },
      error: (error: Error) => {
        console.log('problems in fetching data');
      },
      complete: () => {
        console.log('get employee by id is done');
      },
    });

    this.initializeComponent();

    this.updateNavItemsBasedOnUserRole();

    //end of ngOnInit()
  }

  initializeComponent() {
    // let argsForGetEmployeeDataById = this.empId;

    //get an employee request based on an request Id
    this.route.queryParams.subscribe((params) => {
      this.requestId = params['requestId'];
      this.managerTravelRequest.GetTravelRequest(this.requestId).subscribe({
        next: (data) => {
          data.departureDate =
            this.datePipe.transform(data.departureDate, 'dd/MM/yyyy') || ' ';
          data.returnDate =
            this.datePipe.transform(data.returnDate, 'dd/MM/yyyy') || ' ';
          this.travelRequestDetailViewModel = data;
          this.ticketStatus = data.ticketStatus;
          // Getting the employee profile info

          this.getTravelOptionsByReqId(data.requestId);
          this.isFileSubscription = this.commonApiService.isFile$.subscribe(
            (isFile) => {
              if (isFile) {
                this.getTravelOptionsByReqId(
                  this.travelRequestDetailViewModel.requestId
                );
              }
            }
          );

          this.requestService.getStatusName(this.requestId).subscribe({
            next: (data) => {
              //reqstatus in string
              this.status = data;
              console.log('TA');
            },
            complete: () => {
              this.updateNavItemsBasedOnUserRole();
            },
          });

          //if logged in user is travel admin and request status is ongoing, enable the close button
          if (
            this.userData.role == 'Manager' &&
            this.userData.department == 'TA'
          ) {
            if (this.status === 'Approved by TA') {
              this.isCloseVisible = true;
            }
          }

          this.requestService
            .getEmployeeDataById(
              Number(this.travelRequestDetailViewModel.createdBy)
            )
            .subscribe({
              next: (data) => {
                this.employeeDetails = data;
                console.log(this.employeeDetails);
                //Initializing the Travel Info Maps
                this.generalInformationsMap.set(
                  'FirstName',
                  this.employeeDetails?.firstName
                );
                this.generalInformationsMap.set(
                  'LastName',
                  this.employeeDetails?.lastName
                );
                this.generalInformationsMap.set(
                  'Email',
                  this.employeeDetails?.email
                );
                this.generalInformationsMap.set(
                  'Contact No',
                  this.employeeDetails?.contactNumber
                );
                this.generalInformationsMap.set(
                  'Department',
                  this.employeeDetails?.departmentName
                );
                this.generalInformationsMap.set(
                  'Reports To',
                  this.employeeDetails?.reportsTo
                );
              },
              error: (error: Error) => {
                console.log('problems in fetching data');
              },
              complete: () => {
                console.log('get employee by id is done');
              },
            });

          //Get Request Details For Display - USE IT WITH GET METHOD OF TRAVEL REQ BY ID

          //Initializing the Trip Info Map
          this.tripInformationsMap.set(
            'Source City',
            this.travelRequestDetailViewModel?.sourceCity
          );
          this.tripInformationsMap.set(
            'Destination City',
            this.travelRequestDetailViewModel?.destinationCity
          );
          this.tripInformationsMap.set(
            'Source Country',
            this.travelRequestDetailViewModel?.sourceCountry
          );
          this.tripInformationsMap.set(
            'Destination Country',
            this.travelRequestDetailViewModel?.destinationCountry
          );
          this.tripInformationsMap.set(
            'Travel Type',
            this.travelRequestDetailViewModel?.travelType
          );
          this.tripInformationsMap.set(
            'Trip Type',
            this.travelRequestDetailViewModel?.tripType
          );
          this.tripInformationsMap.set(
            'Travel Mode',
            this.travelRequestDetailViewModel?.travelMode
          );
          this.tripInformationsMap.set(
            'Departure Date',
            this.travelRequestDetailViewModel?.departureDate
          );
          this.tripInformationsMap.set(
            'Return Date',
            this.travelRequestDetailViewModel?.returnDate
          );
          this.tripInformationsMap.set(
            'Preferred Departure Time',
            this.travelRequestDetailViewModel?.prefDepartureTime
          );

          //Additional Informations
          this.additionalInformationsMap.set(
            'Cab Service Requested',
            this.travelRequestDetailViewModel?.cabRequired
          );
          this.additionalInformationsMap.set(
            'Preferred PickUp Time',
            this.travelRequestDetailViewModel?.prefPickUpTime
          );
          this.additionalInformationsMap.set(
            'Accommodation Requested',
            this.travelRequestDetailViewModel?.accommodationRequired
          );
          this.additionalInformationsMap.set(
            'Project Code',
            this.travelRequestDetailViewModel?.projectCode
          );
          this.additionalInformationsMap.set(
            'Purpose of Travel',
            this.travelRequestDetailViewModel?.tripPurpose
          );
        },
        error: (error: Error) => {
          console.log(error);
        },
        complete: () => {
          console.log('completed');
        },
      });
    });
  }

  isLoading: boolean = false;

  //Travel Admin Send Options
  //There by status changes
  onTravelAdminOptionsSend() {
    const requestStatus: RequestStatus = {
      requestId: this.travelRequestDetailViewModel.requestId, // Assign the request ID
      empId: this.currentLoggedInUserId, // Assign the employee ID
      primaryStatusId: 2, // Assign the primary status ID
      date: new Date(), // Assign the current date
      secondaryStatusId: 10, // Assign the secondary status ID
    };

    this.commonApiService.updateRequestStatus(requestStatus).subscribe({
      next: (data) => {
        console.log(data);
        //Pop-up when options are submitted
        //Redirect to another page on submit click
        this.router.navigate(['/traveladmin/requests/waiting']);
      },
      error: (error: Error) => {
        //console.log("Error in posting request status");
        //console.log(error.message);
        this.toastService.showToast({
          message: error.message,
          toastType: 'fail',
          toastDuration: 6000,
        });
      },
      complete: () => {
        console.log('Posting Request Status Complete');
        // alert("Posting Request Status Complete");
        this.toastService.showToast({
          message: 'Travel Options Send',
          toastType: 'success',
          toastDuration: 3000,
        });
      },
    });
  }

  clicked() {
    console.log('clicked');
  }
  //EOF

  openRejectionReasonModal() {
    const initialState = {
      requestId: this.travelRequestDetailViewModel.requestId,
    };

    this.bsModalRef = this.modalService.show(DescriptionModalComponent, {
      initialState,
    });
    this.bsModalRef.content.onClose.subscribe((result: any) => {
      // Handle the result from the modal if needed
      // You can perform actions with the result data here
    });
  }

  //Get Travel Options By Req Id
  getTravelOptionsByReqId(reqId: number) {
    this.requestService.getTravelOptionsByReqId(reqId).subscribe({
      next: (data) => {
        this.travelOptionsData = data;
      },
      error: (error: Error) => {
        console.log('Error has occurred, ' + error.message);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }

  onTravelAdminRequestClose() {
    if (confirm('Do you want to close the request')) {
      const requestStatus: RequestStatus = {
        requestId: this.travelRequestDetailViewModel.requestId, // Assign the request ID
        empId: this.currentLoggedInUserId, // Assign the employee ID
        primaryStatusId: 3, // Assign the primary status ID
        date: new Date(), // Assign the current date
        secondaryStatusId: 10, // Assign the secondary status ID
      };

      this.commonApiService.updateRequestStatus(requestStatus).subscribe({
        next: (data) => {
          console.log(data);
          //Redirect to another page on submit click
          this.router.navigate(['/traveladmin/closed']);
        },
        error: (error: Error) => {
          console.log('Error in posting request status');
          console.log(error.message);
        },
        complete: () => {
          console.log('Posting Request Status Closed');
          // alert("Posting Request Status Complete");
          this.toastService.showToast({
            message: 'Travel Request Closed',
            toastType: 'success',
            toastDuration: 3000,
          });
        },
      });
    }
  }

  //action bar methods

  onBackBtnClick() {
    if (this.currentNavIndex === 0) {
      if (this.currentLoggedInUserRole === 'travelAdmin')
        this.router.navigate(['/traveladmin/incomingrequests']);
      else if (this.currentLoggedInUserRole === 'manager') {
        if (this.status === 'Open') {
          this.router.navigate(['/manager/incoming-requests']);
        } else if (
          this.status === 'Approved by RM' ||
          this.status === 'Waiting' ||
          this.status === 'Selected'
        ) {
          this.router.navigate(['/manager/forwarded-requests']);
        }
      }
      return;
    }

    this.currentNavIndex--;
    this.newReqFormSubMenuValue = this.currentNavIndex;

    if (this.currentNavIndex < this.totalNavCount) {
      this.forwardBtnTitle = 'Next';
    }
  }

  @ViewChild(TabbedOptionViewerComponent)
  tabbedOptionViewer!: TabbedOptionViewerComponent;

  //handling forward btn click
  onForwardBtnClick() {
    if (this.currentNavIndex === this.totalNavCount) {
      //handle manager submission - forwarding, option selections
      if (this.currentLoggedInUserRole === 'manager') {
        if (this.status === 'Open') {
          //Forward Requests
          //replace with actaul emp id
          const managerId = 4;
          this.travelRequestUIService.onManagerForwardTravelRequestForm(
            this.requestId,
            managerId
          );
          this.router.navigate(['manager/incoming-requests']);
        }
        //Options Sent by TA
        else if (this.status === 'Waiting') {
          //choose and submit the option
          //alert(this.tabbedOptionViewer.selectedTravelOptionId)
          this.submitSelectedTravelOption(
            this.tabbedOptionViewer.selectedTravelOptionId
          );
        }
      } 
      else if (
        this.currentLoggedInUserRole === 'travelAdmin' &&
        this.status !== 'Open'
      ) {
        //TA events

        if (this.status === 'Approved by RM') {

          const formData = new FormData();

          // Convert selectedImages to FormData
          for (
            let i = 0;
            i < this.tabbedOptionViewer.addedImageFiles.length;
            i++
          ) {
            formData.append(
              'images',
              this.tabbedOptionViewer.addedImageFiles[i],
              this.tabbedOptionViewer.addedImageFiles[i].name
            );
          }

          // Convert descriptions to JSON string and append to FormData
          // Convert descriptions to FormData
          this.tabbedOptionViewer.fileOptionDescriptions.forEach(
            (desc, index) => {
              formData.append(`description[${index}]`, desc);
            }
          );

          // Convert texts to FormData
          this.tabbedOptionViewer.textOptions.forEach((text, index) => {
            formData.append(`texts[${index}]`, text);
          });

          // Append other fields to FormData
          //sus -
          formData.append(
            'requestId',
            String(this.travelRequestDetailViewModel.requestId)
          );
          formData.append('empId', String(this.currentLoggedInUserId));
          formData.append('primaryStatusId', '2'); // Assign the primary status ID
          formData.append('date', new Date().toISOString()); // Assign the current date
          formData.append('secondaryStatusId', '10'); // Assign the secondary status ID
          console.log(formData);
          this.commonApiService.addOptionsForRequest(formData).subscribe({
            next: (data: string) => {},
            error: (error: Error) => {
              console.log('Error in posting request status');
              console.log(error.message);
            },
            complete: () => {
              console.log('Posting Request Status Complete');
              this.toastService.showToast({
                message: 'Travel Options Send',
                toastType: 'success',
                toastDuration: 3000,
              });
              this.router.navigate(['/traveladmin/requests/incoming']);
              this.currentNavIndex = 0;
              this.newReqFormSubMenuValue = this.currentNavIndex;
              this.forwardBtnTitle = 'Next';
            },
          });
        } 
        else if (this.status === 'Selected') {
      
          this.openOptionConfirmationModal();
          
          this.initializeComponent();
        }
        else if(this.status === 'Approved by TA'){
          if(this.ticketStatus === 'Not Attached'){
            
            //Attach Tickets
              this.onTravelAdminSendTravelTickets();
      
          }
        }
        
      }
    }

    if (this.currentNavIndex + 1 === this.totalNavCount) {
      this.forwardBtnTitle = 'Submit';
    }

    this.currentNavIndex++;
    this.newReqFormSubMenuValue = this.currentNavIndex;
    //console.log(this.currentNavIndex);
  }

  //submit chosen travel option - //status - update - dependency - change status button
  submitSelectedTravelOption(selectedTravelOptionId: number): void {
    console.log('Option confirmed:', selectedTravelOptionId);
    this.requestService
      .submitSelectedOption(this.requestId, this.currentLoggedInUserId, selectedTravelOptionId)
      .subscribe({
        next: (response: any) => {
          console.log('Post successful:', response);
          //this.getAvailableOptionsDescription();
        },
        error: (error: any) => {
          console.error('Post failed:', error);
        },
        complete: () => {
          console.log('Post request completed.');
          this.router.navigate(['manager/dashboard']);
          this.toastService.showToast({
            message: 'Travel Options Selected',
            toastType: 'success',
            toastDuration: 3000,
          });
        },
      });
  }

  openOptionConfirmationModal() {
    const initialState = {
      mainText: 'Travel Option Confirmation',
      description: this.tabbedOptionViewer.isSelectedOptionChanged
        ? 'You have modified the selected option, proceed with these changes?'
        : 'Proceed with the current option selection?',
      cancelBtnText: 'Cancel',
      confirmBtnText: 'Submit',
      confirmBtnColor: '#9a4cfa',
    };

    const modalRef = this.modalService.show(CustomConfirmationModalComponent, {
      initialState,
    });

    modalRef.content?.cancel.subscribe(() => {
      //console.log('Travel request submission canceled.');
      //Initialize the options component
    });

    modalRef.content?.confirm.subscribe(() => {
      this.onTravelAdminConfirmTravelOption(
        this.tabbedOptionViewer.travelAdminConfirmedOptionId
      );
    });
  }

  //Travel Admin Confirm Travel Option
  onTravelAdminConfirmTravelOption(confirmedOptionId: number) {
    const confirmedOptionData = {
      requestId: this.requestId,
      empId: this.currentLoggedInUserId,
      optionId: confirmedOptionId,
    };

    console.log(confirmedOptionData);
    this.requestService
      .confirmSelectedTravelOption(confirmedOptionData)
      .subscribe({
        next: (response: any) => {
          this.toastService.showToast({
            message: 'Travel Options Confirmed',
            toastType: 'success',
            toastDuration: 3000,
          });
        },
        error: (error: any) => {},
        complete: () => {
          this.router.navigate(['/traveladmin/requests/selected-options']);
        },
      });
  }


  //Send Travel Tickets
  onTravelAdminSendTravelTickets(){

    const formData = new FormData();

    // Convert selectedImages to FormData
    for (
      let i = 0;
      i < this.tabbedOptionViewer.addedTicketFiles.length;
      i++
    ) {
      formData.append(
        'tickets',
        this.tabbedOptionViewer.addedTicketFiles[i],
        this.tabbedOptionViewer.addedTicketFiles[i].name
      );
    }

    // Convert descriptions to JSON string and append to FormData
    // Convert descriptions to FormData
    this.tabbedOptionViewer.ticketFileDescriptions.forEach(
      (desc, index) => {
        formData.append(`description[${index}]`, desc);
      }
    );

    // Append other fields to FormData
    formData.append(
      'requestId',
      String(this.travelRequestDetailViewModel.requestId)
    );

    formData.append(
      'empId',
      String(this.currentLoggedInUserId)
    );

    this.travelRequestUIService.sendTravelTickets(formData);

  }




  handleIsSubmitBtnActiveChange(newValue: boolean): void {
    this.isSubmitBtnActive = newValue;
  }


  onRejectBtnClick(){

    if(this.currentLoggedInUserRole === 'manager' || this.currentLoggedInUserRole === 'travelAdmin'){
      //open close modal
      this.openRejectionConfirmationModal();
    }

    if(this.currentLoggedInUserRole === 'employee'){

      //withdraw travel requests

    }

  }


  openRejectionConfirmationModal(){
    
    const initialState = {
      mainText: 'Reject Travel Request?',
      description: 'Kindly specify the reason for declining the travel request',
      cancelBtnText: 'Cancel',
      confirmBtnText: 'Reject',
      confirmBtnColor: '#ec0d0d',
      isTextFieldEnabled : true,
      textFieldLabel : 'Reason for Rejection',
      textFieldPlaceHolder : 'enter the reason',

      onRejectionReasonEntered: this.rejectTravelRequest.bind(this),

    };

    const modalRef = this.modalService.show(CustomConfirmationModalComponent, {
      initialState,
    });

    modalRef.content?.cancel.subscribe(() => {
      
    });


  }


  rejectTravelRequest(reasonForRejection : string){
  
    const rejectionFormData = new FormData();

    rejectionFormData.append(
      'requestId',
      String(this.travelRequestDetailViewModel.requestId)
    );

    rejectionFormData.append(
      'rejectedBy',
      String(this.currentLoggedInUserId)
    );

    rejectionFormData.append(
      'rejectionReason',
      String(reasonForRejection)
    );

    this.travelRequestUIService.rejectTravelRequest(rejectionFormData);

  }


  //EOF
}
