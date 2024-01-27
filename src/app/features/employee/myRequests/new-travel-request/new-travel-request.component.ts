import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { EmployeeDetail } from './request';

@Component({
  selector: 'app-new-travel-request',
  templateUrl: './new-travel-request.component.html',
  styleUrls: ['./new-travel-request.component.css']
})
export class NewTravelRequestComponent {
  //Employee id
  empId : number = 15
  //Employee details from api
  employeeDetail?: EmployeeDetail

  isSideNavBarOpen: any;
  newReqFormSubMenuValue: number;

  leftSectionNavItems = ["General Informations", "Trip Informations", "Additional Informations"];

  constructor(private sideNavBarService: SideNavBarService,private requestService:RequestService) {
    this.newReqFormSubMenuValue = 0;

  }

  //sus
  ngDoCheck() {
    this.isSideNavBarOpen = this.sideNavBarService.isSideNavBarOpen;
  }

  changeNewReqFormSubMenuValue(value: number) {
    this.newReqFormSubMenuValue = value;
  }  


  form!: FormGroup;


  ngOnInit() {
   
    // debugger;
    this.requestService.getEmployeeDataById(this.empId).subscribe({
      next:(data)=>{
      this.employeeDetail = data;
      console.log(this.employeeDetail)},
      error:(error:Error)=>{console.log("problems in fetching data")},
      complete:()=>{console.log("get employee by id is done")}
    });


    this.form = new FormGroup({
      // phone: new FormControl('', Validators.required),

      //Trip Info
      tripType: new FormControl('', Validators.required),
      tripPurpose: new FormControl('', Validators.required),
      departureDate: new FormControl('', Validators.required),
      returnDate: new FormControl('', Validators.required),
      sourceCityZipCode: new FormControl('', Validators.required),
      destinationCityZipCode: new FormControl('', Validators.required),
      sourceCity: new FormControl('', Validators.required),
      destinationCity: new FormControl('', Validators.required),
      sourceState: new FormControl('', Validators.required),
      destinationState: new FormControl('', Validators.required),
      sourceCountry: new FormControl('', Validators.required),
      destinationCountry: new FormControl('', Validators.required),

      //Additional Info
      cabService: new FormControl('', Validators.required),
      hotelAccomodation: new FormControl('', Validators.required),
      prefDepartureTime: new FormControl('', Validators.required),
      mailAttachment: new FormControl('', Validators.required),
      passportAttachment: new FormControl('', Validators.required),
      idCardAttachment: new FormControl('', Validators.required),

    })

  }

  onSubmit() {
    console.log(this.form)
    // this.postData(this.form.value);
  }


}
