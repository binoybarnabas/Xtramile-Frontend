import { Component, ɵsetAlternateWeakRefImpl } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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


  //dummyRequestCode: string = 'REQ000'

  isSideNavBarOpen: any;
  newReqFormSubMenuValue: number;

  leftSectionNavItems = ["General Informations", "Trip Informations", "Additional Informations"];

  constructor(private sideNavBarService: SideNavBarService, private requestService: RequestService) {
    this.newReqFormSubMenuValue = 0;

  }

  //sus
  ngDoCheck() {

    this.isSideNavBarOpen = this.sideNavBarService.isSideNavBarCollapsed;


    // this.isSideNavBarOpen = this.sideNavBarService.isSideNavBarOpen;

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
      tripPurpose: new FormControl('D', Validators.required),
      departureDate: new FormControl('', Validators.required),
      returnDate: new FormControl('', Validators.required),
      sourceCityZipCode: new FormControl('D', Validators.required),
      destinationCityZipCode: new FormControl('D', Validators.required),
      sourceCity: new FormControl('D', Validators.required),
      destinationCity: new FormControl('D', Validators.required),
      sourceState: new FormControl('D', Validators.required),
      destinationState: new FormControl('D', Validators.required),
      sourceCountry: new FormControl('D', Validators.required),
      destinationCountry: new FormControl('D', Validators.required),

      //Additional Info
      cabRequired: new FormControl('no', Validators.required),
      accomodationRequired: new FormControl('no', Validators.required),
      prefDepartureTime: new FormControl('00.00 - 04.00', Validators.required),

      mailAttachment: new FormControl(null, Validators.required),
      passportAttachment: new FormControl(null, Validators.required),
      idCardAttachment: new FormControl(null, Validators.required),
      additionalComments: new FormControl('D', Validators.required),

    })

  }

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


  onFileChange(event: any, controlName: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.travelRequestForm.get(controlName)?.setValue(file);
    this.travelRequestForm.get(controlName)?.updateValueAndValidity();
    console.log('Form Validity:', this.travelRequestForm.valid);
  }


  //Send Request Form Data!

  onEmployeeTravelRequestFormSubmit() {

    this.requestService.sendEmployeeNewTravelRequest(this.travelRequestForm.value).subscribe({

      next: (response) => {
        //     console.log(response)
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

