import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { cities } from 'src/app/services/commonAPIServices/cities';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { UserData } from 'src/app/services/interfaces/iuserData';
import { CustomToastService } from 'src/app/services/toastServices/custom-toast.service';
import { EmployeeDetails } from '../../../components/layout/travel-request-information/request';
import { ShortYearDateFormatPipe } from 'src/app/pipes/ShortYearDate/short-year-date-format.pipe';
import { CustomConfirmationModalComponent } from 'src/app/components/ui/generalUIComponents/custom-confirmation-modal/custom-confirmation-modal.component';

@Component({
  selector: 'app-travel-request-form',
  templateUrl: './travel-request-form.component.html',
  styleUrls: ['./travel-request-form.component.css'],
  providers: [ShortYearDateFormatPipe]
})

export class TravelRequestFormComponent {

  isSideNavBarOpen: any;

  travelRequestForm!: FormGroup;

  isProjectDetailsSectionOpen: boolean;
  selectedPassportFileName: any;
  selectedTravelAuthMailFileName: any;

  selectedTripType: string;
  selectedTravelMode: number;
  selectedTravelType: string;

  selectedOrigin: string;
  selectedDestination: string;

  selectedProjectCode!: string;
  selectedProjectId!: number;
  selectedTravelPurpose: string;

  selectedDepartureDate!: Date;
  nextDayOfSelectedDepartureDate!: Date;

  today: Date;
  tomorrow: Date;

  isPrefDepTimeDetailsSectionOpen: boolean;

  //without AM / PM
  selectedPrefDepTimeSlot: string;

  //AM / PM only
  selectedPrefDepTimeUnit: string;

  //combination of slot with Unit
  selectedPrefDepTime: string;

  isPrefPickUpTimeDetailsSectionOpen: boolean;

  selectedPrefPickUpTime: string;

  isTravelAuthFileSelected: boolean;

  //Employee id
  empId: number

  //Employee details from api
  employeeDetails?: EmployeeDetails

  //userData based on session values
  userData: UserData

  //store project details
  projectCodes: any[] = [];

  travelModes: any[] = [];

  //mapping travel mode remix icons with combination of modeId and modeName
  travelModeIconValueTripletMap = new Map<string, [number, string]>();

  availableDepartureTimes: string[] = [];

  cities = cities;//Fetch Data From Any External API
  sourceFilteredCities: any[] = []; // Separate filtered list for source field
  destinationFilteredCities: any[] = []; // Separate filtered list for destination field

  requestId: number = 0;

  constructor(private sideNavBarService: SideNavBarService,
    private requestService: RequestService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private commonApiService: CommonAPIService,
    private toastService: CustomToastService,
    private modalservice:BsModalService,
    private shortYearDateFormatPipe: ShortYearDateFormatPipe
  ) {

    // Get current date
    this.today = new Date();
    this.tomorrow = new Date(this.today);
    this.tomorrow.setDate(this.today.getDate() + 1);

    const storedUserData = localStorage.getItem('userData');
    //console.log("error check" + storedUserData);
    this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;

    this.empId = this.userData?.empId
    this.isProjectDetailsSectionOpen = false;
    this.selectedTripType = 'round_trip';
    this.selectedTravelMode = 1;
    this.selectedOrigin = 'Thiruvananthapuram';
    this.selectedDestination = 'Kochi';
    this.selectedTravelType = 'domestic'
    this.selectedTravelPurpose = 'Business Meet';
    this.isPrefDepTimeDetailsSectionOpen = false;
    this.selectedPrefDepTimeSlot = '12.00 - 01.00';
    this.selectedPrefDepTimeUnit = 'AM';
    this.selectedPrefDepTime = '12.00 - 01.00 AM';
    this.isPrefPickUpTimeDetailsSectionOpen = false;
    this.selectedPrefPickUpTime = '12 : 30 AM';
    this.isTravelAuthFileSelected = false;

  }

  @ViewChild(CustomConfirmationModalComponent) confirmationModal!: CustomConfirmationModalComponent;
  
  //Format Date to 29 Feb' 24
  formatInputValue(date: Date): string {
    return this.shortYearDateFormatPipe.transform(date);
  }

  //method toggle project and travel purpose section
  toggleProjectDetailsSection(action: string, event: Event) {
    event.stopPropagation();
    
    if (action === 'open') {
      this.isProjectDetailsSectionOpen = true;
    }
    else if (action === 'close') {
      this.selectedTravelPurpose = this.travelRequestForm.value.tripPurpose;
      this.isProjectDetailsSectionOpen = false;
    }
  }

  //to display selected file name
  displayFileName(event: any, fileItem: string) {

    const fileInput = event.target;
    // this.selectedPassportFileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';

    if (fileItem === 'passport') {
      this.selectedPassportFileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';
    }
    else {
      this.selectedTravelAuthMailFileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';
    }

  }

  //change trip type based on user seleciton
  changeTripType(tripType: string) {
    this.selectedTripType = tripType;
  }

  changeTravelMode(travelMode: number) {
    this.selectedTravelMode = travelMode;
  }

  //function to swap entered origin and destinaiton
  //invoked on a two way arrow button click
  swapOriginAndDestination() {
    const temp = this.selectedDestination;
    this.selectedDestination = this.selectedOrigin;
    this.selectedOrigin = temp;
  }

  changePrefDepTimeSlot(newTimeSlot: string) {
    this.selectedPrefDepTimeSlot = newTimeSlot;
  }

  changePrefDepTimeUnit(newUnit: string) {
    this.selectedPrefDepTimeUnit = newUnit;
  }

  //method toggle pref dep time container
  togglePrefDepTimeContainer(action: string, event: Event) {
    event.stopPropagation();

    if (action === 'open') {
      this.isPrefDepTimeDetailsSectionOpen = true;
    }
    else if (action === 'close') {
      this.selectedPrefDepTime = this.selectedPrefDepTimeSlot + " " + this.selectedPrefDepTimeUnit;
      this.isPrefDepTimeDetailsSectionOpen = false;
    }

  }

  //method toggle pref pick time container
  togglePrefPickUpTimeContainer(action: string, event?: Event) {
    event?.stopPropagation();

    if (action === 'open') {
      this.isPrefPickUpTimeDetailsSectionOpen = true;
    }
    else if (action === 'close') {
      // this.selectedPrefDepTime = this.selectedPrefDepTimeSlot + " " + this.selectedPrefDepTimeUnit;
      this.isPrefPickUpTimeDetailsSectionOpen = false;
    }

  }

  ngOnInit() {

    //Get Project Codes By EmpID
    this.getAllProjectCodes(this.empId);

    //Get All Travel Modes
    this.getAllTravelModes();

    this.getAllDepartureTimes();

    //Get Employee Data
    this.requestService.getEmployeeDataById(this.empId).subscribe({

      next: (data) => {
        this.employeeDetails = data;
        console.log(this.employeeDetails)

      },
      error: (error: Error) => { console.log("problems in fetching data") },
      complete: () => { console.log("get employee by id is done") }
    });

    //Form Group
    this.travelRequestForm = new FormGroup({

      //General Info
      createdBy: new FormControl(this.empId, Validators.required),

      //Trip Info
      tripType: new FormControl(this.selectedTripType, Validators.nullValidator),
      travelModeId: new FormControl(this.selectedTravelMode, Validators.nullValidator),
      tripPurpose: new FormControl(this.selectedTravelPurpose, Validators.required),
      departureDate: new FormControl(this.today, Validators.required),
      returnDate: new FormControl(this.tomorrow, Validators.nullValidator),
      sourceCity: new FormControl(this.selectedOrigin, Validators.required),
      destinationCity: new FormControl(this.selectedDestination, Validators.required),

      sourceCountry: new FormControl('India', Validators.nullValidator),
      destinationCountry: new FormControl('India', Validators.nullValidator),
      prefDepartureTime: new FormControl('', Validators.nullValidator),

      //Domestic / International
      travelType: new FormControl(this.selectedTravelType, Validators.required),
      //projectId: new FormControl(this.projectCodes[0], Validators.required),

      //Additional Info
      cabRequired: new FormControl(false, Validators.required),
      prefPickUpTime: new FormControl('', Validators.nullValidator),
      accommodationRequired: new FormControl(false, Validators.required),

      travelAuthorizationEmailCapture: new FormControl('', Validators.nullValidator),

    })
     // Fetch requestId from query parameters
     this.route.queryParams.subscribe(params => {
      const requestId = params['requestId'];
      if (requestId) {
        this.getEmployeeRequestDetails(requestId);
      }
    });
    // Subscribe to value changes in source and destination fields
    this.subscribeToOriginAndDestinationChanges();

    this.subscribeToDepartureDateChanges();

    //end of ngOnInit()
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

  onFileSelected(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      this.isTravelAuthFileSelected = true;
      const fileName = fileInput.files[0].name;
      const fileLabel = document.querySelector('.file_type') as HTMLSpanElement;
      fileLabel.innerHTML = `<i class="icon ri-attachment-2"></i> ${fileName}`;
      this.travelRequestForm.patchValue({
        travelAuthorizationEmailCapture: fileInput.files[0]
      })
    }
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
      this.sourceFilteredCities = this.cities.filter(city => city.city.toLowerCase().includes(filterValue) || city.country.toLowerCase().includes(filterValue));
    } else if (field === 'destinationCity') {
      this.destinationFilteredCities = this.cities.filter(city => city.city.toLowerCase().includes(filterValue) || city.country.toLowerCase().includes(filterValue));
    }
  }

  selectCity(city: any, field: string): void {
    this.travelRequestForm.get(field)?.setValue(city.city);

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
        console.log(data);
        this.selectedProjectId = data[0].projectId;
        this.selectedProjectCode = data[0].projectCode;

      });
  }

  getAllTravelModes(): void {

    this.commonApiService.getAllTravelModes()
      .subscribe((data: any) => {
        // Assuming data is an array of project codes
        this.travelModes = data;

        console.log(data)
        this.setTravelModeIconValueMap();
      });

  }

  //set remix icons based on the values fetch from back end
  setTravelModeIconValueMap() {

    this.travelModes.forEach(mode => {

      //mapping modeNames with remix icons
      switch (mode.modeName) {

        case 'Flight':
          this.travelModeIconValueTripletMap.set("ri-plane-line", [mode.modeId, mode.modeName]);
          break;

        case 'Train':
          this.travelModeIconValueTripletMap.set("ri-train-line", [mode.modeId, mode.modeName]);
          break;

        case 'Bus':
          this.travelModeIconValueTripletMap.set("ri-bus-line", [mode.modeId, mode.modeName]);
          break;

        case 'Cab':
          this.travelModeIconValueTripletMap.set("ri-taxi-line", [mode.modeId, mode.modeName]);
          break;

        default:
          this.travelModeIconValueTripletMap.set("ri-car-line", [mode.modeId, mode.modeName]);
          break;

      }

    });

  }

  //getModeId From the triplet map using keyname
  getModeIdFromMapUsingKey(key: string) {
    const triplet = this.travelModeIconValueTripletMap.get(key);
    if (triplet) {
      return triplet[0];
    } else {
      return 0;
    }
  }


  // Function to convert the Map into an array of key-value pairs
  getTravelModeInfoMapEntries(): [string, any][] {
    return Array.from(this.travelModeIconValueTripletMap.entries());
  }

  //listening to changes happening on origin and destination fields
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

    if (sourceCityControl && destinationCityControl) {

      this.travelRequestForm.get('sourceCity')?.valueChanges.subscribe((newCity: string) => {
        this.selectedOrigin = newCity;
      });

      this.travelRequestForm.get('destinationCity')?.valueChanges.subscribe((newCity: string) => {
        this.selectedDestination = newCity;
      });

    }

  }

  //update default project code - id is also updated since id is being passed to back end
  //project code is for UI
  updateSelectedProjectCode(newProjectId:number, newProjectCode:string){
    this.selectedProjectId = newProjectId;
    this.selectedProjectCode = newProjectCode;
  }

  //update travel type based on selected origin and destination
  updateTravelType() {
    const originCountry = this.travelRequestForm.get('sourceCountry')?.value;
    const destinationCountry = this.travelRequestForm.get('destinationCountry')?.value;
    const travelTypeControl = this.travelRequestForm.get('travelType');

    // If origin and destination countries are the same, set travel type to "Domestic"
    if (originCountry && destinationCountry && originCountry === destinationCountry) {
      travelTypeControl?.setValue('domestic'); // Domestic
      this.selectedTravelType = 'domestic';
    } else {
      // Reset to default value if countries are different
      travelTypeControl?.setValue('international'); // International
      this.selectedTravelType = 'international';
      this.selectedTravelMode = 4;
      this.travelRequestForm.get('accommodationRequired')?.setValue(true);
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
    return this.travelRequestForm.get('cabRequired')?.value === false;
  }

  // Prevent user from typing into the input field
  onKeyDown(event: KeyboardEvent) {
    event.preventDefault();
  }

  //method to get available departure times
  //can be used to connect with any third party API to get realtime data of flight / train / bus timings
  getAllDepartureTimes(): void {

    let departureTimes: string[] = ['12.00 - 01.00', '01.00 - 02.00',
      '02.00 - 03.00', '03.00 - 04.00', '04.00 - 05.00', '05.00 - 06.00', '06.00 - 07.00',
      '07.00 - 08.00', '08.00 - 09.00', '09.00 - 10.00', '10.00 - 11.00', '11.00 - 12.00'];

    this.availableDepartureTimes.push(...departureTimes);

  }

  //subscribe to changes in departure date 
  subscribeToDepartureDateChanges() {

    const departureDateControl = this.travelRequestForm.get('departureDate');
    const returnDateControl = this.travelRequestForm.get('returnDate');

    if (departureDateControl && returnDateControl) {

      departureDateControl.valueChanges.subscribe((newDate: Date) => {
        this.selectedDepartureDate = newDate;

        //To set return date as one day after departure date
        const newReturnDate = new Date(this.selectedDepartureDate);
        newReturnDate.setDate(newReturnDate.getDate() + 1);

        // Update the return date control value
        returnDateControl.setValue(newReturnDate);

      });

    }

  }


  handleTimeSelected(time: string) {
    this.selectedPrefPickUpTime = time;
    this.togglePrefPickUpTimeContainer('close', new Event('dummyEvent'));
    //    alert("Time selected: " + time);
  }

  //travel req submit method
  submitTravelRequest() {
    console.log("TEST SUBMITTED DATA");

    const formData = new FormData();

    formData.append("createdBy", String(this.empId));
    formData.append("tripType", this.selectedTripType === 'round_trip' ? 'Round Trip' : 'One Way');
    formData.append("travelModeId", String(this.selectedTravelMode));
    formData.append("tripPurpose", this.selectedTravelPurpose);
    formData.append("departureDate", this.datePipe.transform(this.travelRequestForm.get('departureDate')?.value, "yyyy-MM-dd") || '');
    if(this.selectedTripType === 'round_trip')
      formData.append("returnDate", this.datePipe.transform(this.travelRequestForm.get('returnDate')?.value, "yyyy-MM-dd") || '');
    formData.append("sourceCity", this.selectedOrigin);
    formData.append("destinationCity", this.selectedDestination);
    formData.append("sourceCountry", this.travelRequestForm.get('sourceCountry')?.value);
    formData.append("destinationCountry", this.travelRequestForm.get('destinationCountry')?.value);
    formData.append("prefDepartureTime", this.selectedPrefDepTime);
    formData.append("travelType", this.selectedTravelType);
    formData.append("projectId", this.selectedProjectId.toString());
    formData.append("accommodationRequired", this.travelRequestForm.value.accommodationRequired === true ? 'Yes' : 'No');
    formData.append("prefPickUpTime", this.isPickUpTimeDisabled() ? '' :this.selectedPrefPickUpTime);
    formData.append("cabRequired", this.travelRequestForm.value.cabRequired === true ? 'Yes' : 'No');
    const fileInput = this.travelRequestForm.get('travelAuthorizationEmailCapture');
    if (fileInput && fileInput.value) {
      formData.append('travelAuthorizationEmailCapture', fileInput.value);
    }

    console.log("DONE");

    this.requestService.sendEmployeeNewTravelRequest(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.toastService.showToast({ message: "Travel request Submitted", toastType: "success", toastDuration: 3000 });
        this.router.navigate(['employee/pending']);
      },
      error: (error: Error) => {
        console.log(error);
      },
      complete: () => {   
      }
    });
  }

  openConfirmationModal() {
    const initialState = {
      mainText: 'Travel Request Confirmation',
      description: 'Please review all the information you have entered to ensure accuracy and completeness. Once submitted, the travel request cannot be modified directly. Any changes will require approval from your supervisor or the travel department.',
      cancelBtnText: 'Cancel',
      confirmBtnText: 'Submit',
      confirmBtnColor: '#9a4cfa'
    };
  
    const modalRef = this.modalservice.show(CustomConfirmationModalComponent, { initialState });
  
    modalRef.content?.cancel.subscribe(() => {
      console.log('Travel request submission canceled.');
    });
  
    modalRef.content?.confirm.subscribe(() => {
      this.submitTravelRequest();
    });
  }

  getEmployeeRequestDetails(requestId: number) {
    this.commonApiService.getEmployeeRequestDetail(requestId).subscribe(
      (data: any) => {
        // Patch form values with the response data
        this.travelRequestForm.patchValue({
          tripType: data.tripType,
          travelModeId: data.travelModeId,
          tripPurpose: data.tripPurpose,
          departureDate: data.departureDate,
          returnDate: data.returnDate,
          sourceCity: data.sourceCity,
          destinationCity: data.destinationCity,
          sourceCountry: data.sourceCountry,
          destinationCountry: data.destinationCountry,
          prefDepartureTime: data.prefDepartureTime,
          travelType: data.travelType,
          cabRequired: data.cabRequired,
          prefPickUpTime: data.prefPickUpTime,
          accommodationRequired: data.accommodationRequired,
          travelAuthorizationEmailCapture: data.travelAuthorizationEmailCapture
        });
      }
    );
  }
  //eof
}
