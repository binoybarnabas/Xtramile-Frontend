import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { CustomDatePipe } from 'src/app/pipes/CustomDate/custom-date.pipe';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationsComponent } from '../../referenceComponents/notifications/notifications.component';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-bar-user',
  templateUrl: './top-bar-user.component.html',
  styleUrls: ['./top-bar-user.component.css']
})
export class TopBarUserComponent {
  date: any
  isSideNavBarCollapsed: any;
  showDropdown: boolean = false;
  @Output() logoutEvent: EventEmitter<string> = new EventEmitter<string>();

  @Input() employeeName: string = ''
  @Input() designation: string = ''

  notificationModalRef?: BsModalRef;

  empId = 0;

  requestNotification: any = [];

  isTravelMessengerOpen: boolean = false;

  isLogoutModalOpen : boolean = false;

  constructor(private sideNavBarService: SideNavBarService, private modalService: BsModalService,
    private requestService: RequestService, private managerService: ManagerTravelRequestsService, private router: Router) {
    this.isSideNavBarCollapsed = sideNavBarService.isSideNavBarCollapsed;
    this.date = Date.now();
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation(); // Prevent click event from bubbling up to the document
    this.showDropdown = !this.showDropdown;
  }


  ngOnInit() {
    let userData
    if (localStorage.getItem('userData')) {
      userData = JSON.parse(localStorage.getItem('userData')!)
      this.empId = userData.empId;
    }
    this.getRequestNotification();
   
    if(userData.department == 'TA'){
      if(this.designation == 'Head'){
        this.designation = "Travel Admin Head";
      }
      else{
        this.designation = "Travel Admin Manager";
      }
    }
  }

  openNotificationModal() {
    this.notificationModalRef = this.modalService.show(NotificationsComponent, {
      backdrop: false,
      initialState: { requestNotification: this.requestNotification },
      class: 'modal-sm'
    })

  }

  closeModal() {
    this.modalService.hide();
  }

  getRequestNotification() {
    if (this.designation == 'Employee') {
      this.requestService.getEmployeeRequestNotification(this.empId).subscribe(
        {
          next: (data) => {
            this.requestNotification = data;
            console.log(this.requestNotification)
          }
        });
    }
    else if (this.designation == 'Manager') {
      this.managerService.getManagerRequestNotification(this.empId).subscribe({
        next: (data) => {
          this.requestNotification = data;
        }
      }
      );
    }
  }

  navigateTo(path: string) {

    this.router.navigate([path]);

  }

  //toggle Travel Messenger Full screen 
  toggleTravelMessenger(){
    
    if(this.isTravelMessengerOpen){
      this.isTravelMessengerOpen = false;
    }
    else{
      //if currentLoggedUser is TA
      //then open the view all messages component
      this.navigateTo('traveladmin/view_all_messages')

      //if curentLoggedInUser is Traveller
      //then Open The TravelMessengerModal Only
      this.isTravelMessengerOpen = true;
    }

  }

  toggleLogoutModal(){
    this.isLogoutModalOpen = this.isLogoutModalOpen ? false : true;
  }


}
