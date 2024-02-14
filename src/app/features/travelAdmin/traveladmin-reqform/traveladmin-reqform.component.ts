import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/components/ui/modal/modal.component';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-traveladmin-reqform',
  templateUrl: './traveladmin-reqform.component.html',
  styleUrls: ['./traveladmin-reqform.component.css']
})
export class TraveladminReqformComponent {
  employeeRequestData: any;
  isSideNavBarOpen: any;
  newReqFormSubMenuValue: number;
  formattedPreferredDepartureTime!: string
  formattedPreferredDepartureDate!: string
  formattedPreferredReturnDate!: string
  bsModalRef!: BsModalRef;
  requestId!: number;

  leftSectionNavItems = ["General Informations", "Trip Informations", "Additional Informations"];

  constructor(private sideNavBarService: SideNavBarService,
    private route: ActivatedRoute,
    private travedladminservice: TravelAdminTravelRequestsService,
    private datePipe: DatePipe,
    private modalService: BsModalService) {
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

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.requestId = params['requestId'];
      console.log(this.requestId)

      this.travedladminservice.getTravelRequest(this.requestId).subscribe({
        next: (data) => {
          this.employeeRequestData = data
          this.formattedPreferredDepartureTime = this.formatDateTime(this.employeeRequestData?.prefDepartureTime);
          this.formattedPreferredDepartureDate = this.formatDate(this.employeeRequestData?.departureDate);
          this.formattedPreferredReturnDate = this.formatDate(this.employeeRequestData?.returnDate);
        },
        error: (error: Error) => {
          console.log(error);
        },
        complete: () => {
          console.log("completed")
        }

      });
      // Use the requestId as needed in your component
    });

  }

  @ViewChild(ModalComponent)
  modalComponent!: ModalComponent;

  //to open modal on click of the add options button
  openModal() {
    const initialState = {
      requestId: this.requestId
    };

    this.bsModalRef = this.modalService.show(ModalComponent);
    this.bsModalRef.content.onClose.subscribe((result: any) => {
      // Handle the result from the modal if needed
      console.log('Modal result:', result);
      // You can perform actions with the result data here
    });
  }

}
