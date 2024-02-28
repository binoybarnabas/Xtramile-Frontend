import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { cities } from 'src/app/services/commonAPIServices/cities';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { UserData } from 'src/app/services/interfaces/iuserData';
import { CustomToastService } from 'src/app/services/toastServices/custom-toast.service';
import { EmployeeDetails } from '../travelRequest/new-travel-request/request';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { slLocale } from 'ngx-bootstrap/chronos';
import { ShortYearDateFormatPipe } from 'src/app/pipes/ShortYearDate/short-year-date-format.pipe';


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
  selectedTravelMode: string;
  selectedOrigin: string;
  selectedDestination: string;

  selectedProjectCode: string = '';
  selectedTravelPurpose: string;

  selectedDepartureDate!: Date;
  nextDayOfSelectedDepartureDate!: Date;

  today: Date;
  tomorrow: Date;

  //Employee id
  empId: number

  //Employee details from api
  employeeDetails?: EmployeeDetails

  //userData based on session values
  userData: UserData

  //store project details
  projectCodes: any[] = [];

  travelModes: any[] = [];

  cities = cities;//Fetch Data From Any External API
  sourceFilteredCities: any[] = []; // Separate filtered list for source field
  destinationFilteredCities: any[] = []; // Separate filtered list for destination field

  constructor(private sideNavBarService: SideNavBarService,
    private requestService: RequestService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private modalService: BsModalService,
    private commonApiService: CommonAPIService,
    private toastService: CustomToastService,
    private shortYearDateFormatPipe: ShortYearDateFormatPipe,

  ) {

    // Get current date
    this.today = new Date();
    this.tomorrow = new Date(this.today);
    this.tomorrow.setDate(this.today.getDate() + 1);

    const storedUserData = localStorage.getItem('userData');
    console.log("error check" + storedUserData);
    this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;

    this.empId = this.userData?.empId
    this.isProjectDetailsSectionOpen = false;
    this.selectedTripType = 'round_trip';
    this.selectedTravelMode = 'flight';
    this.selectedOrigin = 'Trivandrum';
    this.selectedDestination = 'Kochi';
    this.selectedTravelPurpose = 'Business Meet'

  }

  //Format Date to 29 Feb' 24
  formatInputValue(date: Date): string {
    return this.shortYearDateFormatPipe.transform(date);
  }

  //method toggle project and travel purpose section
  toggleProjectDetailsSection(action: string, event: Event) {
    event.stopPropagation();
    if (action === 'open') {
      this.isProjectDetailsSectionOpen = true;
    } else if (action === 'close') {

      this.selectedProjectCode = this.travelRequestForm.value.projectCode;
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
    } else {

      this.selectedTravelAuthMailFileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';

    }

  }

  //change trip type based on user seleciton
  changeTripType(tripType: string) {
    this.selectedTripType = tripType;
  }

  changeTravelMode(travelMode: string) {
    this.selectedTravelMode = travelMode;
  }

  //function to swap entered origin and destinaiton
  //invoked on a two way arrow button click
  swapOriginAndDestination() {
    const temp = this.selectedDestination;
    this.selectedDestination = this.selectedOrigin;
    this.selectedOrigin = temp;
  }

  // ngDoCheck() {
  //   this.isSideNavBarOpen = this.sideNavBarService.isSideNavBarCollapsed;
  // }

  ngOnInit() {

    //Get Project Codes By EmpID
    this.getAllProjectCodes(this.empId);

    //Get All Travel Modes
    this.getAllTravelModes();

    //Get Employee Date
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
      tripType: new FormControl(this.selectedTripType, Validators.required),
      travelMode: new FormControl(this.selectedTravelMode, Validators.required),
      tripPurpose: new FormControl(this.selectedTravelPurpose, Validators.required),
      departureDate: new FormControl(this.today, Validators.required),
      returnDate: new FormControl(this.tomorrow, Validators.nullValidator),
      sourceCity: new FormControl(this.selectedOrigin, Validators.required),
      destinationCity: new FormControl(this.selectedDestination, Validators.required),

      sourceCountry: new FormControl('', Validators.nullValidator),
      destinationCountry: new FormControl('', Validators.nullValidator),
      prefDepartureTime: new FormControl('00.00 - 01.00', Validators.required),

      //Domestic / International
      travelTypeId: new FormControl(1, Validators.required),
      projectCode: new FormControl('', Validators.required),

      //Additional Info
      cabRequired: new FormControl(false, Validators.required),
      prefPickUpTime: new FormControl('', Validators.nullValidator),
      accommodationRequired: new FormControl(false, Validators.required),

      travelAuthorizationEmailCapture: new FormControl(Validators.required),
      passportAttachment: new FormControl(Validators.required),
      // additionalComments: new FormControl('', Validators.nullValidator)

    })

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

  //Handling File Changes
  onFileChange(event: any, controlName: string): void {
    // const file = (event.target as HTMLInputElement).files?.[0];
    const file = event.target.files[0];
    this.travelRequestForm.get(controlName)?.setValue(file);
    this.travelRequestForm.get(controlName)?.updateValueAndValidity();
    console.log('Form Validity:', this.travelRequestForm.valid);
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
        console.log(data);
        this.selectedProjectCode = data[0].projectCode;

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
    return this.travelRequestForm.get('cabRequired')?.value === false;
  }

  onKeyDown(event: KeyboardEvent) {
    // Prevent user from typing into the input field
    event.preventDefault();
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

  //travel req submit method
  submitTravelRequest() {
    alert("submitted")
    console.log("TEST SUBMITTED DATA");

    this.travelRequestForm.value.travelMode = this.selectedTravelMode;
    this.travelRequestForm.value.tripType = this.selectedTripType;

    console.log(this.travelRequestForm.value);
    console.log("DONE");

  }

  //eof
}
