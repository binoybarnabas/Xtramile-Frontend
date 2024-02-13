import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFieldComponent } from './components/ui/input-field/input-field.component';
import { EmployeeComponent } from './features/employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SideNavBarComponent } from './components/layout/employee/employee-home/side-nav-bar/side-nav-bar.component';
import { MiddleConsoleComponent } from './components/layout/employee/employee-home/middle-console/middle-console.component';
import { EmployeeHomeComponent } from './components/layout/employee/employee-home/employee-home.component';
import { NewTravelRequestComponent } from './features/travelRequest/new-travel-request/new-travel-request.component';
import { ManagerSideNavBarComponent } from './components/layout/manager/manager-home/manager-side-nav-bar/manager-side-nav-bar.component';
import { ManagerMiddleConsoleComponent } from './components/layout/manager/manager-home/manager-middle-console/manager-middle-console.component';
import { ManagerHomeComponent } from './components/layout/manager/manager-home/manager-home.component';
import { TravelAdminHomeComponent } from './components/layout/travelAdmin/travel-admin-home/travel-admin-home.component';
import { TravelAdminSideNavBarComponent } from './components/layout/travelAdmin/travel-admin-home/travel-admin-side-nav-bar/travel-admin-side-nav-bar.component';
import { TravelAdminMiddleConsoleComponent } from './components/layout/travelAdmin/travel-admin-home/travel-admin-middle-console/travel-admin-middle-console.component';
import { FinancePersonnelHomeComponent } from './components/layout/financePersonnel/finance-personnel-home/finance-personnel-home.component';
import { FinancePersonnelSideNavBarComponent } from './components/layout/financePersonnel/finance-personnel-home/finance-personnel-side-nav-bar/finance-personnel-side-nav-bar.component';
import { FinancePersonnelMiddleConsoleComponent } from './components/layout/financePersonnel/finance-personnel-home/finance-personnel-middle-console/finance-personnel-middle-console.component';
import { EmployeeDashboardComponent } from './features/employee/employee-dashboard/employee-dashboard.component';
import { EmployeeProfileComponent } from './features/employee/employee-profile/employee-profile.component';
import { EmployeeClosedRequestsComponent } from './features/employee/myRequests/employee-closed-requests/employee-closed-requests.component';
import { EmployeeOngoingRequestsComponent } from './features/employee/myRequests/employee-ongoing-requests/employee-ongoing-requests.component';
import { EmployeePendingRequestsComponent } from './features/employee/myRequests/employee-pending-requests/employee-pending-requests.component';
import { EmployeeNewBillComponent } from './features/employee/mySettlements/employee-new-bill/employee-new-bill.component';
import { EmployeePendingBillComponent } from './features/employee/mySettlements/employee-pending-bill/employee-pending-bill.component';
import { EmployeeClosedBillsComponent } from './features/employee/mySettlements/employee-closed-bills/employee-closed-bills.component';
import { ManagerDashboardComponent } from './features/manager/manager-dashboard/manager-dashboard.component';
import { ManagerProfileComponent } from './features/manager/manager-profile/manager-profile.component';
import { ManagerIncomingTravelRequestsComponent } from './features/manager/travelRequests/manager-incoming-travel-requests/manager-incoming-travel-requests.component';
import { ManagerForwardedTravelRequestsComponent } from './features/manager/travelRequests/manager-forwarded-travel-requests/manager-forwarded-travel-requests.component';
import { ManagerOngoingTravelRequestsComponent } from './features/manager/travelRequests/manager-ongoing-travel-requests/manager-ongoing-travel-requests.component';
import { ManagerClosedTravelRequestsComponent } from './features/manager/travelRequests/manager-closed-travel-requests/manager-closed-travel-requests.component';
import { ManagerIncomingTravelSettlementsComponent } from './features/manager/travelSettlements/manager-incoming-travel-settlements/manager-incoming-travel-settlements.component';
import { ManagerForwardedTravelSettlementsComponent } from './features/manager/travelSettlements/manager-forwarded-travel-settlements/manager-forwarded-travel-settlements.component';
import { ManagerClosedTravelSettlementsComponent } from './features/manager/travelSettlements/manager-closed-travel-settlements/manager-closed-travel-settlements.component';
import { ManagerNewRequestComponent } from './features/manager/myRequests/manager-new-request/manager-new-request.component';
import { ManagerPendingRequestsComponent } from './features/manager/myRequests/manager-pending-requests/manager-pending-requests.component';
import { ManagerOngoingTravelComponent } from './features/manager/myRequests/manager-ongoing-travel/manager-ongoing-travel.component';
import { ManagerTravelHistoryComponent } from './features/manager/myRequests/manager-travel-history/manager-travel-history.component';
import { ManagerNewBillComponent } from './features/manager/mySettlements/manager-new-bill/manager-new-bill.component';
import { ManagerPendingBillsComponent } from './features/manager/mySettlements/manager-pending-bills/manager-pending-bills.component';
import { ManagerClosedBillsComponent } from './features/manager/mySettlements/manager-closed-bills/manager-closed-bills.component';
import { TravelAdminDashboardComponent } from './features/travelAdmin/travel-admin-dashboard/travel-admin-dashboard.component';
import { TravelAdminProfileComponent } from './features/travelAdmin/travel-admin-profile/travel-admin-profile.component';
import { TravelAdminIncomingTravelRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-incoming-travel-requests/travel-admin-incoming-travel-requests.component';
import { TravelAdminWaitingOptionsTravelRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-waiting-options-travel-requests/travel-admin-waiting-options-travel-requests.component';
import { TravelAdminSelectedOptionsTravelRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-selected-options-travel-requests/travel-admin-selected-options-travel-requests.component';
import { TravelAdminOngoingTravelRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-ongoing-travel-requests/travel-admin-ongoing-travel-requests.component';
import { TravelAdminClosedTravelRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-closed-travel-requests/travel-admin-closed-travel-requests.component';
import { TravelAdminIncomingTravelSettlementsComponent } from './features/travelAdmin/travelSettlements/travel-admin-incoming-travel-settlements/travel-admin-incoming-travel-settlements.component';
import { TravelAdminForwardedTravelSettlementsComponent } from './features/travelAdmin/travelSettlements/travel-admin-forwarded-travel-settlements/travel-admin-forwarded-travel-settlements.component';
import { TravelAdminClosedTravelSettlementsComponent } from './features/travelAdmin/travelSettlements/travel-admin-closed-travel-settlements/travel-admin-closed-travel-settlements.component';
import { TravelAdminNewRequestComponent } from './features/travelAdmin/myRequests/travel-admin-new-request/travel-admin-new-request.component';
import { TravelAdminPendingRequestsComponent } from './features/travelAdmin/myRequests/travel-admin-pending-requests/travel-admin-pending-requests.component';
import { TravelAdminOngoingTravelComponent } from './features/travelAdmin/myRequests/travel-admin-ongoing-travel/travel-admin-ongoing-travel.component';
import { TravelAdminTravelHistoryComponent } from './features/travelAdmin/myRequests/travel-admin-travel-history/travel-admin-travel-history.component';
import { FinancePersonnelDashboardComponent } from './features/financePersonnel/finance-personnel-dashboard/finance-personnel-dashboard.component';
import { FinancePersonnelProfileComponent } from './features/financePersonnel/finance-personnel-profile/finance-personnel-profile.component';
import { FinancePersonnelPendingTravelSettlementsComponent } from './features/financePersonnel/settlements/finance-personnel-pending-travel-settlements/finance-personnel-pending-travel-settlements.component';
import { FinancePersonnelClosedTravelSettlementsComponent } from './features/financePersonnel/settlements/finance-personnel-closed-travel-settlements/finance-personnel-closed-travel-settlements.component';
import { FinancePersonnelNewRequestComponent } from './features/financePersonnel/myRequests/finance-personnel-new-request/finance-personnel-new-request.component';
import { FinancePersonnelPendingRequestsComponent } from './features/financePersonnel/myRequests/finance-personnel-pending-requests/finance-personnel-pending-requests.component';
import { FinancePersonnelOngoingTravelComponent } from './features/financePersonnel/myRequests/finance-personnel-ongoing-travel/finance-personnel-ongoing-travel.component';
import { FinancePersonnelTravelHistoryComponent } from './features/financePersonnel/myRequests/finance-personnel-travel-history/finance-personnel-travel-history.component';
import { FinancePersonnelNewBillComponent } from './features/financePersonnel/mySettlements/finance-personnel-new-bill/finance-personnel-new-bill.component';
import { FinancePersonnelPendingBillsComponent } from './features/financePersonnel/mySettlements/finance-personnel-pending-bills/finance-personnel-pending-bills.component';
import { FinancePersonnelClosedBillsComponent } from './features/financePersonnel/mySettlements/finance-personnel-closed-bills/finance-personnel-closed-bills.component';
import { OptionCardComponent } from './components/ui/option-card/option-card.component';
import { OptionviewCardComponent } from './features/employee/myRequests/employee-pending-requests/optionview-card/optionview-card.component';
import { DataTableComponent } from './components/ui/data-table/data-table.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TableFilterComponent } from './components/ui/table-filter/table-filter.component';
import { ChangeStatusButtonComponent } from './components/ui/change-status-button/change-status-button.component';
import { ReqFormComponent } from './features/manager/req-form/req-form.component';
import { TraveladminReqformComponent } from './features/travelAdmin/traveladmin-reqform/traveladmin-reqform.component';
import { ModalComponent } from './components/ui/modal/modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
//import { ToastrModule } from 'ngx-toastr';
import { ViewAvailableOptionsComponent } from './features/travelAdmin/travelRequests/view-available-options/view-available-options.component';
import { TravelAdminWaitingRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-waiting-options-travel-requests/travel-admin-waiting-requests/travel-admin-waiting-requests.component';
import { TravelAdminSelectedRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-selected-options-travel-requests/travel-admin-selected-requests/travel-admin-selected-requests.component';
import { EmployeeViewCardComponent } from './components/ui/employee-view-card/employee-view-card.component';
import { LoginPageComponent } from './components/layout/login-page/login-page.component';
import { TopBarUserComponent } from './components/ui/top-bar-user/top-bar-user.component';
import { CustomDatePipe } from './pipes/CustomDate/custom-date.pipe';

//import { ChangeStatusButtonComponent } from './components/ui/change-status-button/change-status-button.component';
import { PerdiemCardComponent } from './components/ui/perdiem-card/perdiem-card.component';
import { FileCardComponent } from './components/ui/file-card/file-card.component';
import { LoginComponent } from './components/ui/login/login.component';
import { DescriptionModalComponent } from './components/ui/description-modal/description-modal.component';
import { TravelRequestCardComponent } from './components/ui/travel-request-card/travel-request-card.component';
import { TimestampToDatePipe } from './pipes/timeStampToDate/timestamp-to-date.pipe';
import { ForgotPasswordModalComponent } from './components/ui/login/forgot-password-modal/forgot-password-modal.component';
import { HttpInterceptService } from './http-intercept.service';
import { DashboardUpcomingTripComponent } from './components/ui/dashboard-upcoming-trip/dashboard-upcoming-trip/dashboard-upcoming-trip.component';
import { DashboardProgressComponent } from './components/ui/dashboard-progress/dashboard-progress/dashboard-progress.component';
import { DashboardCardComponent } from './components/ui/dashboard-card/dashboard-card/dashboard-card.component';
import { StatusPipe } from './pipes/Status/status.pipe';
import { NotificationsComponent } from './components/ui/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFieldComponent,
    EmployeeComponent,
    SideNavBarComponent,
    MiddleConsoleComponent,
    EmployeeHomeComponent,
    NewTravelRequestComponent,
    ManagerHomeComponent,
    ManagerSideNavBarComponent,
    ManagerMiddleConsoleComponent,
    TravelAdminHomeComponent,
    TravelAdminSideNavBarComponent,
    TravelAdminMiddleConsoleComponent,
    FinancePersonnelHomeComponent,
    FinancePersonnelSideNavBarComponent,
    FinancePersonnelMiddleConsoleComponent,
    EmployeeDashboardComponent,
    EmployeeProfileComponent,
    EmployeeClosedRequestsComponent,
    EmployeePendingRequestsComponent,
    EmployeeOngoingRequestsComponent,
    EmployeeNewBillComponent,
    EmployeePendingBillComponent,
    EmployeeClosedBillsComponent,
    ManagerDashboardComponent,
    ManagerProfileComponent,
    ManagerIncomingTravelRequestsComponent,
    ManagerForwardedTravelRequestsComponent,
    ManagerOngoingTravelRequestsComponent,
    ManagerClosedTravelRequestsComponent,
    ManagerIncomingTravelSettlementsComponent,
    ManagerForwardedTravelSettlementsComponent,
    ManagerClosedTravelSettlementsComponent,
    ManagerNewRequestComponent,
    ManagerPendingRequestsComponent,
    ManagerOngoingTravelComponent,
    ManagerTravelHistoryComponent,
    ManagerNewBillComponent,
    ManagerPendingBillsComponent,
    ManagerClosedBillsComponent,
    TravelAdminDashboardComponent,
    TravelAdminProfileComponent,
    TravelAdminIncomingTravelRequestsComponent,
    TravelAdminWaitingOptionsTravelRequestsComponent,
    TravelAdminSelectedOptionsTravelRequestsComponent,
    TravelAdminOngoingTravelRequestsComponent,
    TravelAdminClosedTravelRequestsComponent,
    TravelAdminIncomingTravelSettlementsComponent,
    TravelAdminForwardedTravelSettlementsComponent,
    TravelAdminClosedTravelSettlementsComponent,
    TravelAdminNewRequestComponent,
    TravelAdminPendingRequestsComponent,
    TravelAdminOngoingTravelComponent,
    TravelAdminTravelHistoryComponent,
    FinancePersonnelDashboardComponent,
    FinancePersonnelProfileComponent,
    FinancePersonnelPendingTravelSettlementsComponent,
    FinancePersonnelClosedTravelSettlementsComponent,
    FinancePersonnelNewRequestComponent,
    FinancePersonnelPendingRequestsComponent,
    FinancePersonnelOngoingTravelComponent,
    FinancePersonnelTravelHistoryComponent,
    FinancePersonnelNewBillComponent,
    FinancePersonnelPendingBillsComponent,
    FinancePersonnelClosedBillsComponent,
    OptionCardComponent,
    OptionviewCardComponent,
    DataTableComponent,
    TableFilterComponent,
    ChangeStatusButtonComponent,
    PerdiemCardComponent,
    FileCardComponent,
    LoginComponent,
    ReqFormComponent,
    TraveladminReqformComponent,
    ModalComponent,
    EmployeeViewCardComponent,
    ViewAvailableOptionsComponent,
    TravelAdminWaitingRequestsComponent,
    TravelAdminSelectedRequestsComponent,
    LoginPageComponent,
    TopBarUserComponent,
    CustomDatePipe,
    DescriptionModalComponent,
    TravelRequestCardComponent,
    TimestampToDatePipe,
    ForgotPasswordModalComponent,
    DashboardUpcomingTripComponent,
    DashboardProgressComponent,
    DashboardCardComponent,
    StatusPipe,
    NotificationsComponent,
  ]
  ,

  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PaginationModule.forRoot(),
    // ToastrModule.forRoot({
    //   timeOut: 3000,
    //   positionClass: 'toast-center', // Set to center of the screen
    //   preventDuplicates: true,
    // }),

    ModalModule.forRoot()

  ],
  providers: [DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptService, multi: true }],
  bootstrap: [AppComponent]
})

export class AppModule { }
