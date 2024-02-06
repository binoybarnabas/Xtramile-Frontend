import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { EmployeeDetails } from '../../employee/myRequests/new-travel-request/request';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DescriptionModalComponent } from 'src/app/components/ui/description-modal/description-modal.component';

@Component({
  selector: 'app-req-form',
  templateUrl: './req-form.component.html',
  styleUrls: ['./req-form.component.css'],
  providers: [DatePipe]
})
export class ReqFormComponent {

  //Employee request data : a single travel request data 
  employeeRequestData : any
  
  //navbar and submenu
  isSideNavBarOpen: any;
  newReqFormSubMenuValue: number;

  //date formatting
  formattedPreferredDepartureTime!: string
  formattedPreferredDepartureDate!: string
  formattedPreferredReturnDate!: string
  requestID!: number;

  //navbar left section
  leftSectionNavItems = ["General Informations", "Trip Informations", "Additional Informations"];  
  bsModalRef!: BsModalRef;
  constructor(private sideNavBarService: SideNavBarService,
    private route: ActivatedRoute,
    private managerTravelRequest : ManagerTravelRequestsService,
    private datePipe:DatePipe,
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService
    ) 
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

    selectedPriority:number = 0

    //priority
    priorityForm = new FormGroup({
      selectedPriority: new FormControl('1') // Set the default value to '1' (High)
    });
  

  ngOnInit(){

    this.route.queryParams.subscribe(params => {
      const requestId = params['requestId'];
      this.requestID = requestId
      console.log(requestId);
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
    });

    const selectedPriorityControl = this.priorityForm.get('selectedPriority');

    if (selectedPriorityControl) {
      selectedPriorityControl.valueChanges.subscribe(value => {
        // Handle the selected value here
        console.log('Selected Priority:', value);
        this.selectedPriority = Number(value);
        console.log("******************",this.selectedPriority);
        // You can now use the value as needed
      });
    }
    
  }


  ApproveRequest(){
    console.log(this.selectedPriority);
    this.managerTravelRequest.setRequestPriorityAndApprove(this.employeeRequestData.requestId,this.selectedPriority).subscribe(
      {
        next:(data)=>{
          console.log(data);
           // Redirect to another page
          this.router.navigate(['/manager/dashboard']);
        },
        complete:()=>{

          this.toastr.success('Request approved!', 'Success');
        }
      }
    );
  }

  RejectRequest(){
    this.managerTravelRequest.cancelRequest(this.employeeRequestData.requestId).subscribe(
      {
        next:(data)=>{
          console.log(data);
          // Redirect to another page
         this.router.navigate(['/manager/dashboard']);
        },
        complete:()=>{
          this.toastr.warning('Request Rejected!', 'Warning');
        }
      }
    );

    // this.toastr.warning('Request Rejected!', 'Success');
    // Redirect to another page
    this.router.navigate(['/manager/dashboard']);
  }
  openModal() {
    const initialState = {
      requestId: this.requestID
    };
    
    this.bsModalRef = this.modalService.show(DescriptionModalComponent, { initialState });
    this.bsModalRef.content.onClose.subscribe((result: any) => {
      // Handle the result from the modal if needed
      console.log('Modal result:', result);
      // You can perform actions with the result data here
    });
  }
}
