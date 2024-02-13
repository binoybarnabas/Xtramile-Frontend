import { ChangeDetectorRef, Component, ViewChild, ɵsetAlternateWeakRefImpl } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { EmployeeDetails } from './request';
import { TravelRequestDetailViewModel, TravelRequestDetails } from 'src/app/services/interfaces/iTravelRequestDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/components/ui/modal/modal.component';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { RequestStatus } from 'src/app/components/ui/change-status-button/request-status';
import { UserData } from 'src/app/services/interfaces/iuserData';
import { DescriptionModalComponent } from 'src/app/components/ui/description-modal/description-modal.component';
import { cities } from 'src/app/services/commonAPIServices/cities';


@Component({
  selector: 'app-new-travel-request',
  templateUrl: './new-travel-request.component.html',
  styleUrls: ['./new-travel-request.component.css']
})


export class NewTravelRequestComponent {
  //Employee id
  empId: number

  //Employee details from api
  employeeDetails?: EmployeeDetails

  //userData based on session values
  userData: UserData

  //store project details
  projectCodes: any[] = [];

  //Get Request Details
  travelRequestDetails!: TravelRequestDetails;

  travelRequestDetailViewModel!: TravelRequestDetailViewModel
  //Map to keep data by differenct sections of Travel Request Form
  //Can be used to provide a view to those users who do not want to edit it
  generalInformationsMap = new Map<string, any>();
  tripInformationsMap = new Map<string, any>();
  additionalInformationsMap = new Map<string, any>();


  //sus
  requestStatus!: RequestStatus

  bsModalRef!: BsModalRef;

  travelModes: any[] = [];

  isReturnDateDisabled: boolean = true;


  cities = cities;//Fetch Data From Any External API
  sourceFilteredCities: any[] = []; // Separate filtered list for source field
  destinationFilteredCities: any[] = []; // Separate filtered list for destination field


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


  travelRequestFormSubmitFunction: () => void = this.onEmployeeTravelRequestFormSubmit.bind(this);

  constructor(private sideNavBarService: SideNavBarService,
    private requestService: RequestService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private managerTravelRequest: ManagerTravelRequestsService,
    private router: Router,
    private modalService: BsModalService,
    private commonApiService: CommonAPIService
  ) {

    const storedUserData = localStorage.getItem('userData');
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

        case 'Employee': this.currentLoggedInUserRole = 'employee';
          break;

        case 'Manager': if (this.userData.department == 'TA') {
          this.currentLoggedInUserRole = 'travelAdmin';
          this.newReqFormSubMenuValue = 4;

        }
        else if (this.userData.department == 'FD') {
          this.currentLoggedInUserRole = 'financePersonnel';
        }
        else {
          this.currentLoggedInUserRole = 'manager';
        }
          break;
      }
    }

    //Priority field is editable for manager only
    if (this.currentLoggedInUserRole !== 'manager') {
      this.additionalInformationsMap.set('Priority', this.travelRequestDetails?.priority);
    }

    this.additionalInformationsMap.set('Additional Comments', this.travelRequestDetails?.additionalComments);

  }


  ngDoCheck() {

    this.isSideNavBarOpen = this.sideNavBarService.isSideNavBarCollapsed;

  }


  changeNewReqFormSubMenuValue(value: number) {
    this.newReqFormSubMenuValue = value;
  }


  //To Update the New Req Form Sections Based on user roles
  updateNavItemsBasedOnUserRole() {

    switch (this.currentLoggedInUserRole) {

      case 'employee':
        this.leftSectionNavItems = ["General Informations", "Trip Informations", "Additional Informations"];
        break;

      case 'manager':
        this.leftSectionNavItems = ["General Informations", "Trip Informations", "Additional Informations", "Documents Attached"];
        break;

      case 'travelAdmin':
        this.leftSectionNavItems = ["General Informations", "Trip Informations", "Additional Informations", "Documents Attached", "Add Available Options"];
        break;

      case 'financePersonnel':
        this.leftSectionNavItems = ["General Informations", "Trip Informations", "Additional Informations", "Per Diem Allocation"];

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

    //Different role has different submit functions
    this.changeSubmitFunction();

    // let argsForGetEmployeeDataById = this.empId;

    //Get Project Codes By EmpID
    this.getAllProjectCodes(this.empId);

    //Get All Travel Modes
    this.getAllTravelModes();

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
          this.travelRequestDetailViewModel = data
          // Getting the employee profile info

          console.log(data)

          if (this.currentLoggedInUserRole != 'employee') {

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
          }

          //Get Request Details For Display - USE IT WITH GET METHOD OF TRAVEL REQ BY ID
          //Initializing the Trip Info Map

          this.tripInformationsMap.set('Project Code', this.travelRequestDetailViewModel?.projectCode);
          this.tripInformationsMap.set('Travel Type', this.travelRequestDetailViewModel?.travelType);
          this.tripInformationsMap.set('Trip Type', this.travelRequestDetailViewModel?.tripType);
          this.tripInformationsMap.set('Travel Mode', this.travelRequestDetailViewModel?.travelMode);

          this.tripInformationsMap.set('Source City', this.travelRequestDetailViewModel?.sourceCity);
          this.tripInformationsMap.set('Source Country', this.travelRequestDetailViewModel?.sourceCountry);
          this.tripInformationsMap.set('Destination City', this.travelRequestDetailViewModel?.destinationCity);
          this.tripInformationsMap.set('Destination Country', this.travelRequestDetailViewModel?.destinationCountry);

          this.tripInformationsMap.set('Departure Date', this.travelRequestDetailViewModel?.departureDate);
          this.tripInformationsMap.set('Return Date', this.travelRequestDetailViewModel?.returnDate);
          this.tripInformationsMap.set('Preferred Departure Time', this.travelRequestDetailViewModel?.prefDepartureTime);
          this.tripInformationsMap.set('Purpose Travel', this.travelRequestDetailViewModel?.tripPurpose);


          //Additional Informations
          this.additionalInformationsMap.set('Cab Service Requested', this.travelRequestDetailViewModel?.cabRequired);
          this.additionalInformationsMap.set('Preferred PickUp Time', this.travelRequestDetailViewModel?.prefPickUpTime);
          this.additionalInformationsMap.set('Accommodation Requested', this.travelRequestDetailViewModel?.accommodationRequired);
          this.additionalInformationsMap.set('Additional Comments', this.travelRequestDetailViewModel?.additionalComments);
        },
        error: (error: Error) => {
          console.log(error);
        },
        complete: () => {
          console.log("completed")
        }
      });
    });


    // To separate the user detail when a request detail is picked by the manager to get the corresponding employee details
    //who raised the requests.
    // this.requestService.getEmployeeDataById(Number(this.travelRequestDetailViewModel.createdBy)).subscribe({
    //   next: (data) => {
    //     this.employeeDetails = data;
    //     console.log(this.employeeDetails)
    //     alert(this.employeeDetails);
    //     //Initializing the Travel Info Maps
    //     this.generalInformationsMap.set('FirstName', this.employeeDetails?.firstName);
    //     this.generalInformationsMap.set('LastName', this.employeeDetails?.lastName);
    //     this.generalInformationsMap.set('Email', this.employeeDetails?.email);
    //     this.generalInformationsMap.set('Contact No', this.employeeDetails?.contactNumber);
    //     this.generalInformationsMap.set('Department', this.employeeDetails?.departmentName);
    //     this.generalInformationsMap.set('Reports To', this.employeeDetails?.reportsTo);
    //     this.generalInformationsMap.set('Project Code', this.employeeDetails?.projectCode);
    //     this.generalInformationsMap.set('Project Name', this.employeeDetails?.projectName);

    //   },
    //   error: (error: Error) => { console.log("problems in fetching data") },
    //   complete: () => { console.log("get employee by id is done") }
    // });


    //Validation for employee editable fields
    if (this.currentLoggedInUserRole === 'employee') {

      this.travelRequestForm = new FormGroup({

        //General Info
        createdBy: new FormControl(this.empId, Validators.required),
        firstName: new FormControl(this.employeeDetails?.firstName, Validators.nullValidator),
        lastName: new FormControl(this.employeeDetails?.lastName, Validators.nullValidator),
        email: new FormControl(this.employeeDetails?.email, Validators.nullValidator),
        contactNumber: new FormControl(this.employeeDetails?.contactNumber, Validators.nullValidator),
        departmentName: new FormControl(this.employeeDetails?.departmentName, Validators.nullValidator),
        reportsTo: new FormControl(this.employeeDetails?.reportsTo, Validators.nullValidator),

        //Trip Info
        tripType: new FormControl('One Way', Validators.required),
        travelModeId: new FormControl(1, Validators.required),
        tripPurpose: new FormControl('Business Meet', Validators.required),
        departureDate: new FormControl('', [Validators.required, this.dateFormatValidator, this.futureDateValidator]),
        returnDate: new FormControl('', [Validators.nullValidator, this.dateFormatValidator, this.futureDateValidator, this.dateRangeValidator]),
        sourceCity: new FormControl('', Validators.required),
        destinationCity: new FormControl('', Validators.required),

        sourceCountry: new FormControl('', Validators.nullValidator),
        destinationCountry: new FormControl('', Validators.nullValidator),
        prefDepartureTime: new FormControl('00.00 - 01.00', Validators.required),

        //Domestic / International
        travelTypeId: new FormControl(1, Validators.required),
        projectId: new FormControl(1, Validators.required),

        //Additional Info
        cabRequired: new FormControl('yes', Validators.required),
        prefPickUpTime: new FormControl('', Validators.nullValidator),
        accommodationRequired: new FormControl('yes', Validators.required),

        travelAuthorizationEmailCapture: new FormControl(null, Validators.required),
        passportAttachment: new FormControl(null, Validators.required),
        additionalComments: new FormControl(null, Validators.nullValidator)

      })



    }

    //validation for manager editable field
    if (this.currentLoggedInUserRole === 'manager') {
      this.travelRequestForm = new FormGroup({
        priority: new FormControl('', Validators.required)
      });

    }

    // Subscribe to value changes in source and destination fields
    this.subscribeToOriginAndDestinationChanges();

    this.subscribeToTripTypeChanges();

    //end of ngOnInit()

  }


  //Handling the priority slider
  priorityLevelText: string = "Medium"; // Default priority value
  updatePriority(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    console.log("value", value, typeof (value));
    if (value !== null && value !== undefined) {
      const priorityTexts = ["Low", "Medium", "High"];
      this.priorityLevelText = priorityTexts[parseInt(value) - 1];

      console.log("priority", this.priorityLevelText);
    }
  }




  //CUSTOM VALIDATORS
  //Validating Date Format
  dateFormatValidator(control: FormControl): ValidationErrors | null {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!control.value.match(dateRegex)) {
      return { invalidDateFormat: true }; // Validation failed
    }

    return null; // Validation passed
  }

  //Validator for checking the given date is a future date or not
  futureDateValidator(control: FormControl): ValidationErrors | null {
    const currentDate = new Date();
    const enteredDate = new Date(control.value);

    if (enteredDate <= currentDate) {
      return { futureDate: true }; // Validation failed
    }
    return null; // Validation passed
  }

  //Need some Bug Fixes!!!!!!!!!!!!!!!
  //Validator for checking the given return date is earlier than the departure date
  dateRangeValidator(formGroup: FormGroup): ValidationErrors | null {

    const departureDate = formGroup.get('departureDate')?.value;
    const returnDate = formGroup.get('returnDate')?.value;

    if (departureDate && returnDate && returnDate <= departureDate) {
      return { dateRange: true }; // Validation failed
    }

    return null; // Validation passed
  }

  //Validator for file size - not used yet - need testing
  fileValidator(control: FormControl): { [key: string]: any } | null {
    const file = control.value;
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB, adjust as needed
      if (file.size > maxSize) {
        return { 'fileSizeExceeded': true };
      }
    }
    return null;
  }

  //Handling File Changes
  onFileChange(event: any, controlName: string): void {
    // const file = (event.target as HTMLInputElement).files?.[0];
    const file = event.target.files[0];
    this.travelRequestForm.get(controlName)?.setValue(file);
    this.travelRequestForm.get(controlName)?.updateValueAndValidity();
    console.log('Form Validity:', this.travelRequestForm.valid);
  }


  // Conditionally change the submit function
  changeSubmitFunction() {

    switch (this.currentLoggedInUserRole) {
      case 'manager':
        this.travelRequestFormSubmitFunction = this.onManagerForwardTravelRequestForm.bind(this);
        break;

      case 'travelAdmin':
        this.travelRequestFormSubmitFunction = this.onTravelAdminForwardTravelRequestForm.bind(this);
        break;

      case 'financePersonnel':
        this.travelRequestFormSubmitFunction = this.onFinancePersonnelAllocatePerDiem.bind(this);
        break;

      default:
        this.travelRequestFormSubmitFunction = this.onEmployeeTravelRequestFormSubmit.bind(this);
        break;

    }


  }


  //Send Request Form Data!
  onEmployeeTravelRequestFormSubmit() {

    console.log("Val" + this.travelRequestForm.value)
    this.requestService.sendEmployeeNewTravelRequest(this.travelRequestForm.value).subscribe({

      next: (response) => {
        console.log(response)
        alert("Request Submitted Successfully!")
        this.router.navigate(['employee/pending']);
      },
      error: (error: Error) => {
        alert("Error has occured" + error.message);
      },
      complete: () => {
        console.log("COMPLETED");
      }

    });

  }

  //Manager forwarding the travel request form
  onManagerForwardTravelRequestForm() {
    //Should call a PATCH method to set priority of the request
    alert("Approved")
    console.log(this.travelRequestForm.value.priority);

    this.managerTravelRequest.setRequestPriorityAndApprove(this.travelRequestDetailViewModel.requestId, this.travelRequestForm.value.priority).subscribe(
      {
        next: (data) => {
          console.log(data);
          // window.alert(this.travelRequestDetailViewModel.requestId + "  " + this.travelRequestForm.value.priority);
          console.log(this.travelRequestDetailViewModel.requestId + "  " + this.travelRequestForm.value.priority);
          // Redirect to another page
          this.router.navigate(['/manager/dashboard']);
        },
        complete: () => {
          alert("Approved");
          //this.toastr.success('Request approved!', 'Success');
        }
      }
    );
  }

  //Travel Admin forwarding the travel request form
  onTravelAdminForwardTravelRequestForm() {
    //Should call a POST Method to send options and forward req to finance
    alert("TRAVEL ADMIN")

  }

  //Travel Admin Send Options
  //There by status changes
  onTravelAdminOptionsSend() {

    const requestStatus: RequestStatus = {
      requestId: this.travelRequestDetailViewModel.requestId, // Assign the request ID
      empId: 10,     // Assign the employee ID
      primaryStatusId: 10, // Assign the primary status ID
      date: new Date(),  // Assign the current date
      secondaryStatusId: 10 // Assign the secondary status ID

    };

    this.commonApiService.updateRequestStatus(requestStatus).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error: Error) => {
        console.log("Error in posting request status");
        console.log(error.message);
      },
      complete: () => {
        console.log("Posting Request Status Complete");
        alert("Posting Request Status Complete");
      }
    });
  }


  //Finance Person Allocating the perdiem
  onFinancePersonnelAllocatePerDiem() {
    //should call a post method to approve perdiem 
    //There by trip goes to ongoing

    alert("FINANCE")

  }


  clicked() {
    console.log("clicked");
  }
  //EOF



  // TRAVEL ADMIN
  openAddOptionModal() {
    const initialState = {
      requestId: this.travelRequestDetailViewModel.requestId
    };

    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
    this.bsModalRef.content.onClose.subscribe((result: any) => {
      // Handle the result from the modal if needed
      console.log('Modal result:', result);
      // You can perform actions with the result data here
    });
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





  filterCities(event: any, field: string): void {
    const value = event.target.value;
    if (!value) {
      if (field === 'sourceCity') {
        this.sourceFilteredCities = [];
      } else if (field === 'destinationCity') {
        this.destinationFilteredCities = [];
      }
      return;
    }
    const filterValue = value.toLowerCase();
    if (field === 'sourceCity') {
      this.sourceFilteredCities = this.cities.filter(city => city.name.toLowerCase().includes(filterValue));
    } else if (field === 'destinationCity') {
      this.destinationFilteredCities = this.cities.filter(city => city.name.toLowerCase().includes(filterValue));
    }
  }

  selectCity(city: any, field: string): void {
    this.travelRequestForm.get(field)?.setValue(city.name);
    if (field === 'sourceCity') {
      this.travelRequestForm.get('sourceCountry')?.setValue(city.country); // Set the source country value
      this.sourceFilteredCities = []; // Clear source filtered list
    } else if (field === 'destinationCity') {
      this.travelRequestForm.get('destinationCountry')?.setValue(city.country); // Set the destination country value
      this.destinationFilteredCities = []; // Clear destination filtered list
    }
  }


  getAllProjectCodes(empId: number): void {
    this.commonApiService.getAllProjectCodesByEmployeeId(empId)
      .subscribe((data: any) => {
        // Assuming data is an array of project codes
        this.projectCodes = data;
        console.log(data)
      });
  }


  getAllTravelModes(): void {

    this.commonApiService.getAllTravelModes()
      .subscribe((data: any) => {
        // Assuming data is an array of project codes
        this.travelModes = data;
        console.log(data)
      });

  }




  subscribeToOriginAndDestinationChanges() {
    const sourceCityControl = this.travelRequestForm.get('sourceCity');
    const destinationCityControl = this.travelRequestForm.get('destinationCity');

    if (sourceCityControl && destinationCityControl) {
      this.travelRequestForm.get('sourceCountry')?.valueChanges.subscribe(() => {
        this.updateTravelType();
      });

      this.travelRequestForm.get('destinationCountry')?.valueChanges.subscribe(() => {
        this.updateTravelType();
      });
    }
  }

  updateTravelType() {
    const originCountry = this.travelRequestForm.get('sourceCountry')?.value;
    const destinationCountry = this.travelRequestForm.get('destinationCountry')?.value;
    const travelTypeControl = this.travelRequestForm.get('travelTypeId');

    // If origin and destination countries are the same, set travel type to "Domestic"
    if (originCountry && destinationCountry && originCountry === destinationCountry) {
      travelTypeControl?.setValue('2'); // Domestic
    } else {
      // Reset to default value if countries are different
      travelTypeControl?.setValue('1'); // International
    }
  }



  togglePickUpTime() {
    const cabRequiredControl = this.travelRequestForm.get('cabRequired');
    if (cabRequiredControl?.value === 'no') {
      this.travelRequestForm.get('prefPickUpTime')?.disable();
      this.travelRequestForm.get('prefPickUpTime')?.reset(); // Reset the value if disabled
    } else {
      this.travelRequestForm.get('prefPickUpTime')?.enable();
    }
  }

  isPickUpTimeDisabled() {
    return this.travelRequestForm.get('cabRequired')?.value === 'no';
  }







  subscribeToTripTypeChanges() {

    const tripTypeControl = this.travelRequestForm.get('tripType');


    if (tripTypeControl) {
      this.travelRequestForm.get('tripType')?.valueChanges.subscribe(() => {
        // console.log("Control" + tripTypeControl)

        this.toggleReturnDate();
      });

    }

  }



  toggleReturnDate() {
    const tripType = this.travelRequestForm.get('tripType')?.value;

    if (tripType === 'One Way') {

      this.isReturnDateDisabled = true;

      console.log(this.isReturnDateDisabled);

    } else {
      this.isReturnDateDisabled = false;
      console.log(this.isReturnDateDisabled);

    }


  }






  //EOF 
}
