import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { EmployeeDetails } from '../../employee/myRequests/new-travel-request/request';
import { ActivatedRoute } from '@angular/router';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-req-form',
  templateUrl: './req-form.component.html',
  styleUrls: ['./req-form.component.css'],
  providers: [DatePipe]
})
export class ReqFormComponent {

  //Employee id
  employeeRequestData : any
  isSideNavBarOpen: any;
  newReqFormSubMenuValue: number;
  formattedPreferredDepartureTime!: string
  formattedPreferredDepartureDate!: string
  formattedPreferredReturnDate!: string

  leftSectionNavItems = ["General Informations", "Trip Informations", "Additional Informations"];

  constructor(private sideNavBarService: SideNavBarService,
    private route: ActivatedRoute,
    private managerTravelRequest : ManagerTravelRequestsService,
    private datePipe:DatePipe) 
    {
    this.newReqFormSubMenuValue = 0;
  }

  formatDateTime(dateString: string): string {
    const formattedDate = this.datePipe.transform(dateString, 'yyyy-MM-dd HH:mm:ss');
    return formattedDate || ''; // Handle potential null value
  }

  formatDate(dateString: string): string {
    const formattedDate = this.datePipe.transform(dateString, 'yyyy-MM-dd');
    return formattedDate || ''; // Handle potential null value
  }

  ngDoCheck() {

    this.isSideNavBarOpen = this.sideNavBarService.isSideNavBarCollapsed;

  }

  changeNewReqFormSubMenuValue(value: number) {
    this.newReqFormSubMenuValue = value;
  }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      const requestId = params['requestId'];
      
      this.managerTravelRequest.GetTravelRequest(requestId).subscribe({
        next:(data)=>{
          this.employeeRequestData = data
          this.formattedPreferredDepartureTime = this.formatDateTime(this.employeeRequestData?.prefDepartureTime);
          this.formattedPreferredDepartureDate = this.formatDate(this.employeeRequestData?.departureDate);
          this.formattedPreferredReturnDate = this.formatDate(this.employeeRequestData?.returnDate);
        },
        error:(error:Error)=>{
          console.log(error);
        },
        complete:()=>{
          console.log("completed")
        }

      });
      // Use the requestId as needed in your component
    });
    
  }


}
