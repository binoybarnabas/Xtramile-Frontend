import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeHomeComponent } from './components/layout/contentLoaders/employee-home/employee-home.component';
import { NewTravelRequestComponent } from './components/ui/generalUIComponents/travel-request-information/travel-request-information.component';
import { ManagerHomeComponent } from './components/layout/contentLoaders/manager-home/manager-home.component';
import { ManagerIncomingTravelRequestsComponent } from './features/manager/travelRequests/manager-incoming-travel-requests/manager-incoming-travel-requests.component';
import { ManagerClosedTravelRequestsComponent } from './features/manager/travelRequests/manager-closed-travel-requests/manager-closed-travel-requests.component';
import { TravelAdminHomeComponent } from './components/layout/contentLoaders/travel-admin-home/travel-admin-home.component';

import { TravelAdminDashboardComponent } from './features/travelAdmin/travel-admin-dashboard/travel-admin-dashboard.component';
import { TravelAdminIncomingTravelRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-incoming-travel-requests/travel-admin-incoming-travel-requests.component';
import { TravelAdminClosedTravelRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-closed-travel-requests/travel-admin-closed-travel-requests.component';
import { FinancePersonnelHomeComponent } from './components/layout/contentLoaders/finance-personnel-home/finance-personnel-home.component';
import { FinancePersonnelDashboardComponent } from './features/financePersonnel/finance-personnel-dashboard/finance-personnel-dashboard.component';
import { FinancePersonnelIncomingTravelSettlementsComponent } from './features/financePersonnel/settlements/finance-personnel-incoming-travel-settlements/finance-personnel-incoming-travel-settlements.component';
import { FinancePersonnelPendingTravelSettlementsComponent } from './features/financePersonnel/settlements/finance-personnel-pending-travel-settlements/finance-personnel-pending-travel-settlements.component';
import { FinancePersonnelClosedTravelSettlementsComponent } from './features/financePersonnel/settlements/finance-personnel-closed-travel-settlements/finance-personnel-closed-travel-settlements.component';
import { FinancePersonnelProfileComponent } from './features/financePersonnel/finance-personnel-profile/finance-personnel-profile.component';
import { ManagerOngoingTravelRequestsComponent } from './features/manager/travelRequests/manager-ongoing-travel-requests/manager-ongoing-travel-requests.component';

import { TravelAdminWaitingRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-waiting-requests/travel-admin-waiting-requests.component';
import { TravelAdminSelectedRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-selected-requests/travel-admin-selected-requests.component';
import {
  employeeAuthGuard,
  managerAuthGuard,
  travelAdminAuthGuard,
} from './auth.guard';
import { LoginComponent } from './components/ui/login/login.component';

import { TravelRequestFormComponent } from './features/travellerFeatures/travel-request-form/travel-request-form.component';
import { TravellerDashboardComponent } from './components/layout/contentLoaders/traveller-dashboard/traveller-dashboard.component';
import { TravellerDocumentsComponent } from './features/travellerFeatures/traveller-documents/traveller-documents.component';
import { TraveladminViewTravelDocumentsComponent } from './features/travelAdmin/travelDocuments/traveladmin-view-travel-documents/traveladmin-view-travel-documents.component';
import { TravelAdminOngoingTravelRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-ongoing-travel-requests/travel-admin-ongoing-travel-requests.component';
import { TravellerPendingRequestsComponent } from './features/travellerFeatures/traveller-pending-requests/traveller-pending-requests.component';
import { TravelMessengerFullScreenComponent } from './features/travelAdmin/travel-messenger-full-screen/travel-messenger-full-screen.component';
import { ManagerForwardedTravelRequestsComponent } from './features/manager/travelRequests/manager-forwarded-travel-requests/manager-forwarded-travel-requests.component';
import { UserProfileComponent } from './features/travellerFeatures/user-profile/user-profile.component';
import { TravellerRequestHistoryComponent } from './features/travellerFeatures/traveller-request-history/traveller-request-history.component';
import { TravellerApprovedRequestsComponent } from './features/travellerFeatures/traveller-approved-requests/traveller-approved-requests.component';
import { CustomStepChartComponent } from './components/ui/generalUIComponents/custom-step-chart/custom-step-chart.component';
import { TravellerRequestProgressDetailsComponent } from './features/travellerFeatures/traveller-request-progress-details/traveller-request-progress-details.component';
import { ManagerDashboardComponent } from './components/layout/contentLoaders/manager-dashboard/manager-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'login', component: LoginPageComponent },
  { path: 'login', component: LoginComponent },

  {
    // path: 'employee', component: EmployeeHomeComponent,canActivate:[authGuard], children: [
    path: 'traveller',
    component: EmployeeHomeComponent,
    canActivate: [employeeAuthGuard],
    children: [
      { path: 'dashboard', component: TravellerDashboardComponent },
      { path: 'new-travel-request', component: TravelRequestFormComponent },
      { path: 'requests/pending', component: TravellerPendingRequestsComponent },
      { path: 'requests/ongoing', component: TravellerApprovedRequestsComponent },
      { path: 'requests/history', component: TravellerRequestHistoryComponent },
      { path: 'requests/progress', component: TravellerRequestProgressDetailsComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'documents', component: TravellerDocumentsComponent },
    ],
  },
  {
    path: 'manager',
    component: ManagerHomeComponent,
    canActivate: [managerAuthGuard],
    children: [
      { path: 'dashboard', component: ManagerDashboardComponent },
      { path: 'requestdetail', component: NewTravelRequestComponent },
      { path: 'incoming-requests', component: ManagerIncomingTravelRequestsComponent },
      { path: 'forwarded-requests', component: ManagerForwardedTravelRequestsComponent },
      { path: 'approved-requests', component: ManagerOngoingTravelRequestsComponent },
      { path: 'closed-requests', component: ManagerClosedTravelRequestsComponent },

      { path: 'new-request', component: TravelRequestFormComponent },
      { path: 'my-pending-requests', component: TravellerPendingRequestsComponent },
      { path: 'my-approved-requests', component: TravellerApprovedRequestsComponent },
      { path: 'my-request-history', component: TravellerRequestHistoryComponent },
      { path: 'profile', component: UserProfileComponent },
    ],
  },
  {
    path: 'traveladmin',
    component: TravelAdminHomeComponent,
    canActivate: [travelAdminAuthGuard],
    children: [
      { path: 'dashboard', component: TravelAdminDashboardComponent },
      {
        path: 'view-travel-documents',
        component: TraveladminViewTravelDocumentsComponent,
      },
      {
        path: 'view-all-messages',
        component: TravelMessengerFullScreenComponent,
      },
      {
        path: 'requests/incoming',
        component: TravelAdminIncomingTravelRequestsComponent,
      },
      {
        path: 'requests/waiting-options',
        component: TravelAdminWaitingRequestsComponent,
      },
      {
        path: 'requests/selected-options',
        component: TravelAdminSelectedRequestsComponent,
      },
      {
        path: 'requests/approved',
        component: TravelAdminOngoingTravelRequestsComponent,
      },
      { path: 'requests/closed', component: TravelAdminClosedTravelRequestsComponent },
      //Component Name - Updated to newTravelRequestComponent
      { path: 'requestdetail', component: NewTravelRequestComponent },
      { path: 'new-travel-request', component: TravelRequestFormComponent },
      { path: 'my-pending-requests', component: TravellerPendingRequestsComponent },
      { path: 'my-approved-requests', component: TravellerApprovedRequestsComponent },
      { path: 'my-request-history', component: TravellerRequestHistoryComponent },
      { path: 'profile', component: UserProfileComponent },
    ],
  },
  {
    path: 'finance',
    component: FinancePersonnelHomeComponent,
    canActivate: [],
    children: [
      { path: 'dashboard', component: FinancePersonnelDashboardComponent },
      {
        path: 'incoming',
        component: FinancePersonnelIncomingTravelSettlementsComponent,
      },
      {
        path: 'pending',
        component: FinancePersonnelPendingTravelSettlementsComponent,
      },
      {
        path: 'closed',
        component: FinancePersonnelClosedTravelSettlementsComponent,
      },
      { path: 'profile', component: FinancePersonnelProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
