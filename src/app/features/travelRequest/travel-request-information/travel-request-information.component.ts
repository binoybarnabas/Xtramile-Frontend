import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { EmployeeDetails } from './request';
import { TravelRequestDetailViewModel } from 'src/app/services/interfaces/iTravelRequestDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/components/ui/modal/modal.component';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { RequestStatus } from 'src/app/components/ui/referenceComponents/change-status-button/request-status';
import { UserData } from 'src/app/services/interfaces/iuserData';
import { DescriptionModalComponent } from 'src/app/components/ui/form-components/description-modal/description-modal.component';
import { TravelOptionDetails } from 'src/app/services/interfaces/iTravelOptionDetails';
import { CustomToastService } from 'src/app/services/toastServices/custom-toast.service';
import { TextEditorComponent } from 'src/app/components/ui/text-editor/text-editor.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-travel-request',
  templateUrl: './travel-request-information.component.html',
  styleUrls: ['./travel-request-information.component.css']
})

export class NewTravelRequestComponent {

  //Employee id
  empId: number

  //Employee details from api
  employeeDetails?: EmployeeDetails

  //userData based on session values
  userData: UserData

  travelRequestDetailViewModel!: TravelRequestDetailViewModel

  //Map to keep data by differenct sections of Travel Request Form
  //Can be used to provide a view to those users who do not want to edit it
  generalInformationsMap = new Map<string, any>();
  tripInformationsMap = new Map<string, any>();
  additionalInformationsMap = new Map<string, any>();

  requestDetailsPageHeading : string = 'TRAVEL REQUEST INFORMATION';

  //action bar items
  backBtnTitle : string = 'Back';
  forwardBtnTitle : string = 'Next';

  totalNavCount : number = 0;
  currentNavIndex: number = 0;

  //sus
  requestStatus!: RequestStatus

  bsModalRef!: BsModalRef;

  travelOptionsData: TravelOptionDetails[] = [];

  //to identify if its travel admin close request screen
  isCloseVisible: boolean =false;

  optionFileUrl: string = "";

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
  
  constructor(private sideNavBarService: SideNavBarService,
    private requestService: RequestService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private managerTravelRequest: ManagerTravelRequestsService,
    private router: Router,
    private modalService: BsModalService,
    private commonApiService: CommonAPIService,
    private toastService: CustomToastService
    
  ) {

    const storedUserData = localStorage.getItem('userData');
    console.log("error check" + storedUserData);
    this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;

    this.empId = this.userData?.empId

    this.newReqFormSubMenuValue = 0;

    //Getting the current Loggedin user based on session value
    this.currentLoggedInUserRole = '';

    const userData = localStorage.getItem('userData')

    if (userData != null) {
      this.userData = JSON.parse(userData);
      console.log("userdata" + this.userData);

      switch (this.userData.role) {

        case 'Manager': if (this.userData.department == 'TA') {
          this.currentLoggedInUserRole = 'travelAdmin';
          //this.newReqFormSubMenuValue = 4;
        }
        else if (this.userData.department == 'FD') {
          this.currentLoggedInUserRole = 'financePersonnel';
        }
        else {
          this.currentLoggedInUserRole = 'manager';
          //this.newReqFormSubMenuValue = 2;
        }
          break;
      }
    }

  }

  ngDoCheck() {

    this.isSideNavBarOpen = this.sideNavBarService.isSideNavBarCollapsed;

  }

  changeNewReqFormSubMenuValue(value: number) {
    this.newReqFormSubMenuValue = value;
    this.currentNavIndex = value;
    
    if(value === this.totalNavCount){
      this.forwardBtnTitle = 'Submit';
    }else{
      this.forwardBtnTitle = 'Next';
    }

  }

  //To Update the New Req Form Sections Based on user roles
  updateNavItemsBasedOnUserRole() {

    switch (this.currentLoggedInUserRole) {

      case 'manager':
        this.leftSectionNavItems = ["General Information", "Trip Information", "Additional Information", "Documents Attached"];
        this.totalNavCount = 3;
        break;

      case 'travelAdmin':
        this.leftSectionNavItems = ["General Information", "Trip Information", "Additional Information", "Documents Attached", "Travel Options"];
        this.totalNavCount = 4;
        break;

      case 'financePersonnel':
        this.leftSectionNavItems = ["General Information", "Trip Information", "Additional Information", "Per Diem Allocation"];
        this.totalNavCount = 3;
        break;
    }

  }

  // format date from request info
  formatDateTime(dateString: string | undefined): string {
    const formattedDate = this.datePipe.transform(dateString, 'yyyy-MM-dd HH:mm:ss');
    return formattedDate || ''; // Handle potential null value
  }

  //format datetime format for preferred departure time
  formatDate(dateString: string | undefined): string {
    const formattedDate = this.datePipe.transform(dateString, 'yyyy-MM-dd');
    return formattedDate || ''; // Handle potential null value
  }

  //date formatting
  formattedPreferredDepartureTime!: string
  formattedPreferredDepartureDate!: string
  formattedPreferredReturnDate!: string

  travelRequestForm!: FormGroup;

  ngOnInit() {

    this.updateNavItemsBasedOnUserRole();

    // let argsForGetEmployeeDataById = this.empId;

    this.requestService.getEmployeeDataById(this.empId).subscribe({

      next: (data) => {
        this.employeeDetails = data;
        console.log(this.employeeDetails)

      },
      error: (error: Error) => { console.log("problems in fetching data") },
      complete: () => { console.log("get employee by id is done") }
    });

    //get an employee request based on an request Id
    this.route.queryParams.subscribe(params => {
      const requestId = params['requestId'];
      console.log(requestId);
      this.managerTravelRequest.GetTravelRequest(requestId).subscribe({
        next: (data) => {
          data.departureDate = this.datePipe.transform(data.departureDate, "dd/MM/yyyy") || ' ';
          data.returnDate = this.datePipe.transform(data.returnDate, "dd/MM/yyyy") || ' '
          this.travelRequestDetailViewModel = data
          // Getting the employee profile info

          this.getTravelOptionsByReqId(data.requestId)
          this.isFileSubscription = this.commonApiService.isFile$.subscribe(isFile => {
            if (isFile) {
              this.getTravelOptionsByReqId(this.travelRequestDetailViewModel.requestId);
            }
          });
          console.log(data)

          //if logged in user is travel admin and request status is ongoing, enable the close button
          if(this.userData.role =='Manager' && this.userData.department == 'TA' ){
            this.requestService.getStatusName(requestId).subscribe(({
              next: (data) => {
                console.log("TA")
                if(data=='Ongoing'){
                  this.isCloseVisible=true;
                }
              }
            })
            );
          }

          this.requestService.getEmployeeDataById(Number(this.travelRequestDetailViewModel.createdBy)).subscribe({

              next: (data) => {
                this.employeeDetails = data;
                console.log(this.employeeDetails)
                //Initializing the Travel Info Maps
                this.generalInformationsMap.set('FirstName', this.employeeDetails?.firstName);
                this.generalInformationsMap.set('LastName', this.employeeDetails?.lastName);
                this.generalInformationsMap.set('Email', this.employeeDetails?.email);
                this.generalInformationsMap.set('Contact No', this.employeeDetails?.contactNumber);
                this.generalInformationsMap.set('Department', this.employeeDetails?.departmentName);
                this.generalInformationsMap.set('Reports To', this.employeeDetails?.reportsTo);

              },
              error: (error: Error) => { console.log("problems in fetching data") },
              complete: () => { console.log("get employee by id is done") }
          });
          
          //Get Request Details For Display - USE IT WITH GET METHOD OF TRAVEL REQ BY ID

          //Initializing the Trip Info Map
          this.tripInformationsMap.set('Source City', this.travelRequestDetailViewModel?.sourceCity);
          this.tripInformationsMap.set('Destination City', this.travelRequestDetailViewModel?.destinationCity);
          this.tripInformationsMap.set('Source Country', this.travelRequestDetailViewModel?.sourceCountry);
          this.tripInformationsMap.set('Destination Country', this.travelRequestDetailViewModel?.destinationCountry);
          this.tripInformationsMap.set('Travel Type', this.travelRequestDetailViewModel?.travelType);
          this.tripInformationsMap.set('Trip Type', this.travelRequestDetailViewModel?.tripType);
          this.tripInformationsMap.set('Travel Mode', this.travelRequestDetailViewModel?.travelMode);
          this.tripInformationsMap.set('Departure Date', this.travelRequestDetailViewModel?.departureDate);
          this.tripInformationsMap.set('Return Date', this.travelRequestDetailViewModel?.returnDate);
          this.tripInformationsMap.set('Preferred Departure Time', this.travelRequestDetailViewModel?.prefDepartureTime);

          //Additional Informations
          this.additionalInformationsMap.set('Cab Service Requested', this.travelRequestDetailViewModel?.cabRequired);
          this.additionalInformationsMap.set('Preferred PickUp Time', this.travelRequestDetailViewModel?.prefPickUpTime);
          this.additionalInformationsMap.set('Accommodation Requested', this.travelRequestDetailViewModel?.accommodationRequired);
          this.additionalInformationsMap.set('Project Code', this.travelRequestDetailViewModel?.projectCode);
          this.additionalInformationsMap.set('Purpose of Travel', this.travelRequestDetailViewModel?.tripPurpose);
        },
        error: (error: Error) => {
          console.log(error);
        },
        complete: () => {
          console.log("completed")
        }
      });
    });

    //end of ngOnInit()
  }

  isLoading: boolean = false;

  //Manager forwarding the travel request form
  onManagerForwardTravelRequestForm() {
    //Should call a PATCH method to set priority of the request
    console.log(this.travelRequestForm.value.priority);

    this.managerTravelRequest.setRequestPriorityAndApprove(this.travelRequestDetailViewModel.requestId).subscribe(
      {
        next: (data) => {
          console.log(data);
          // window.alert(this.travelRequestDetailViewModel.requestId + "  " + this.travelRequestForm.value.priority);
          console.log(this.travelRequestDetailViewModel.requestId + "  " + this.travelRequestForm.value.priority);
          // Redirect to another page
          //alert("Approved");
          this.router.navigate(['/manager/dashboard']);

        },
        complete: () => {
          //this.toastr.success('Request approved!', 'Success');
          this.toastService.showToast("Travel Request Approved!")
        }
      }
    );
  }

  //Travel Admin Send Options
  //There by status changes
  onTravelAdminOptionsSend() {

    const requestStatus: RequestStatus = {
      requestId: this.travelRequestDetailViewModel.requestId, // Assign the request ID
      empId: this.empId,     // Assign the employee ID
      primaryStatusId: 2, // Assign the primary status ID
      date: new Date(),  // Assign the current date
      secondaryStatusId: 10 // Assign the secondary status ID

    };

    this.commonApiService.updateRequestStatus(requestStatus).subscribe({
      next: (data) => {
        console.log(data);
        //Pop-up when options are submitted
        //Redirect to another page on submit click
        this.router.navigate(['/traveladmin/waiting']);

      },
      error: (error: Error) => {
        console.log("Error in posting request status");
        console.log(error.message);
      },
      complete: () => {
        console.log("Posting Request Status Complete");
        // alert("Posting Request Status Complete");
        this.toastService.showToast("Travel Options Send!")
      }
    });
  }

  clicked() {
    console.log("clicked");
  }
  //EOF

  // TRAVEL ADMIN
  openAddTextOptionModal(){
    const initialState = {
      requestId: this.travelRequestDetailViewModel.requestId
    };

    // this.getTravelOptionsByReqId(this.travelRequestDetailViewModel.requestId)


    this.bsModalRef = this.modalService.show(TextEditorComponent, { initialState });
    this.bsModalRef.content.onClose.subscribe((result: any) => {
      // Handle the result from the modal if needed
      console.log('Modal result:', result);


      // You can perform actions with the result data here
    });
  }

  openAddOptionModal() {
    const initialState = {
      requestId: this.travelRequestDetailViewModel.requestId
    };
 
    this.bsModalRef = this.modalService.show(TextEditorComponent, { initialState });
    this.bsModalRef.content.onClose.subscribe((result: any) => {
      // Handle the result from the modal if needed
      console.log('Modal result:', result);
 
      // You can perform actions with the result data here
  })
}

  openRejectionReasonModal() {
    const initialState = {
      requestId: this.travelRequestDetailViewModel.requestId
    };

    this.bsModalRef = this.modalService.show(DescriptionModalComponent, { initialState });
    this.bsModalRef.content.onClose.subscribe((result: any) => {
      // Handle the result from the modal if needed
      console.log('Modal result:', result);
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
        console.log("Error has occurred, " + error.message);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }

  onTravelAdminRequestClose() {
    if(confirm("Do you want to close the request")){
      const requestStatus: RequestStatus = {
        requestId: this.travelRequestDetailViewModel.requestId, // Assign the request ID
        empId: this.empId,     // Assign the employee ID
        primaryStatusId: 3, // Assign the primary status ID
        date: new Date(),  // Assign the current date
        secondaryStatusId: 10 // Assign the secondary status ID
      };
  
      this.commonApiService.updateRequestStatus(requestStatus).subscribe({
        next: (data) => {
          console.log(data);
          //Redirect to another page on submit click
          this.router.navigate(['/traveladmin/closed']);
        },
        error: (error: Error) => {
          console.log("Error in posting request status");
          console.log(error.message);
        },
        complete: () => {
          console.log("Posting Request Status Closed");
          // alert("Posting Request Status Complete");
          this.toastService.showToast("Request closed")
        }
      });
    }
  }

  //Deletion of Options
  selectedOptionIds: number[] = [];

  toggleOptionSelection(item: any) {
      const index = this.selectedOptionIds.indexOf(item.optionId);
      if (index === -1) {
          this.selectedOptionIds.push(item.optionId);
      } else {
          this.selectedOptionIds.splice(index, 1);
      }
  }
  
  isSelected(item: any): boolean {
      return this.selectedOptionIds.includes(item.optionId);
  }
  
  deleteSelectedOptions() {
      // Call your service method to delete selected option IDs
      this.requestService.deleteOptions(this.selectedOptionIds).subscribe({
          next: () => {
              console.log("Selected options deleted successfully.");
              // Clear the selectedOptionIds array
              this.selectedOptionIds = [];
              this.commonApiService.setIsFile(true);
          },
          error: (error: Error) => {
              console.log("Error deleting selected options: " + error.message);
          }
      });
  }
  
  //action bar methods

  onBackBtnClick(){

    if(this.currentNavIndex === 0){
      this.router.navigate(['/traveladmin/incomingrequests']);
      return;
    }

    this.currentNavIndex --;
    this.newReqFormSubMenuValue = this.currentNavIndex;

    if(this.currentNavIndex < this.totalNavCount){
      this.forwardBtnTitle = 'Next'
    }

  }

  onForwardBtnClick(){

    if(this.currentNavIndex === this.totalNavCount){
      alert('submitted');
      this.currentNavIndex = 0;
      this.newReqFormSubMenuValue = this.currentNavIndex;
      this.forwardBtnTitle = 'Next';
      return;
    }

    if(this.currentNavIndex+1 === this.totalNavCount){
      // console.log(this.currentNavIndex);
      this.forwardBtnTitle = 'Submit';
    }

    this.currentNavIndex++;
    this.newReqFormSubMenuValue = this.currentNavIndex;
    console.log(this.currentNavIndex);

  }


  //EOF 
}
