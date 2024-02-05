import { Component, ɵsetAlternateWeakRefImpl } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { EmployeeDetails } from './request';

@Component({
  selector: 'app-new-travel-request',
  templateUrl: './new-travel-request.component.html',
  styleUrls: ['./new-travel-request.component.css']
})
export class NewTravelRequestComponent {
  //Employee id
  empId: number = 15
  //Employee details from api
  employeeDetails?: EmployeeDetails

  isSideNavBarOpen: any;
  newReqFormSubMenuValue: number;

  leftSectionNavItems = ["General Informations", "Trip Informations", "Additional Informations"];

  constructor(private sideNavBarService: SideNavBarService, private requestService: RequestService) {
    this.newReqFormSubMenuValue = 0;

  }

  //sus
  ngDoCheck() {

    this.isSideNavBarOpen = this.sideNavBarService.isSideNavBarCollapsed;

  }

  changeNewReqFormSubMenuValue(value: number) {
    this.newReqFormSubMenuValue = value;
  }


  travelRequestForm!: FormGroup;


  ngOnInit() {

    // debugger;
    this.requestService.getEmployeeDataById(this.empId).subscribe({
      next: (data) => {
        this.employeeDetails = data;
        console.log(this.employeeDetails)
      },
      error: (error: Error) => { console.log("problems in fetching data") },
      complete: () => { console.log("get employee by id is done") }
    });



    this.travelRequestForm = new FormGroup({

      //General Info
      createdBy: new FormControl(this.empId, Validators.required),
      firstName: new FormControl(this.employeeDetails?.firstName, Validators.nullValidator),
      lastName: new FormControl(this.employeeDetails?.lastName, Validators.nullValidator),
      email: new FormControl(this.employeeDetails?.email, Validators.nullValidator),
      contactNumber: new FormControl(this.employeeDetails?.contactNumber, Validators.nullValidator),
      departmentName: new FormControl(this.employeeDetails?.departmentName, Validators.nullValidator),
      reportsTo: new FormControl(this.employeeDetails?.reportsTo, Validators.nullValidator),
      projectCode: new FormControl(this.employeeDetails?.projectCode, Validators.nullValidator),
      projectName: new FormControl(this.employeeDetails?.projectName, Validators.nullValidator),

      //Trip Info
      travelTypeId: new FormControl(0, Validators.required),
      tripPurpose: new FormControl('Business Meet', Validators.required),
      departureDate: new FormControl('', [Validators.required, this.dateFormatValidator, this.futureDateValidator]),
      returnDate: new FormControl('', [Validators.required, this.dateFormatValidator, this.futureDateValidator, this.dateRangeValidator]),
      sourceCityZipCode: new FormControl('890678', Validators.required),
      destinationCityZipCode: new FormControl('890765', Validators.required),
      sourceCity: new FormControl('Trivandrum', Validators.required),
      destinationCity: new FormControl('Austin', Validators.required),
      sourceState: new FormControl('Kerala', Validators.required),
      destinationState: new FormControl('Texas', Validators.required),
      sourceCountry: new FormControl('India', Validators.required),
      destinationCountry: new FormControl('USA', Validators.required),

      //Additional Info
      cabRequired: new FormControl('yes', Validators.required),
      accommodationRequired: new FormControl('yes', Validators.required),
      prefDepartureTime: new FormControl('00.00 - 04.00', Validators.required),

      travelAuthorizationEmailCapture: new FormControl(Validators.required),
      passportAttachment: new FormControl(Validators.required),
      idCardAttachment: new FormControl(Validators.required),

      additionalComments: new FormControl(null, Validators.nullValidator)

    })

  }


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





  //Send Request Form Data!
  onEmployeeTravelRequestFormSubmit() {

    console.log(this.travelRequestForm.value)
    this.requestService.sendEmployeeNewTravelRequest(this.travelRequestForm.value).subscribe({

      next: (response) => {
        console.log(response)
        alert("Request Submitted Successfully!")
      },
      error: (error: Error) => {
        alert("Error has occured" + error.message);
      },
      complete: () => {
        console.log("COMPLETED");
      }

    });

  }







}
