  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { EmployeeHomeComponent } from './components/layout/employee/employee-home/employee-home.component';
  import { NewTravelRequestComponent } from './features/employee/myRequests/new-travel-request/new-travel-request.component';
  import { EmployeePendingRequestsComponent } from './features/employee/myRequests/employee-pending-requests/employee-pending-requests.component';
  import { EmployeeOngoingRequestsComponent } from './features/employee/myRequests/employee-ongoing-requests/employee-ongoing-requests.component';
  import { EmployeeClosedRequestsComponent } from './features/employee/myRequests/employee-closed-requests/employee-closed-requests.component';
import { ManagerHomeComponent } from './components/layout/manager/manager-home/manager-home.component';
import { ManagerIncomingTravelRequestsComponent } from './features/manager/travelRequests/manager-incoming-travel-requests/manager-incoming-travel-requests.component';
import { ManagerForwardedTravelRequestsComponent } from './features/manager/travelRequests/manager-forwarded-travel-requests/manager-forwarded-travel-requests.component';
import { ManagerOngoingTravelComponent } from './features/manager/myRequests/manager-ongoing-travel/manager-ongoing-travel.component';
import { ManagerClosedTravelRequestsComponent } from './features/manager/travelRequests/manager-closed-travel-requests/manager-closed-travel-requests.component';
import { EmployeeDashboardComponent } from './features/employee/employee-dashboard/employee-dashboard.component';
import { ManagerDashboardComponent } from './features/manager/manager-dashboard/manager-dashboard.component';
import { EmployeeProfileComponent } from './features/employee/employee-profile/employee-profile.component';
import { OptionviewCardComponent } from './features/employee/myRequests/employee-pending-requests/optionview-card/optionview-card.component';
import { TravelAdminHomeComponent } from './components/layout/travelAdmin/travel-admin-home/travel-admin-home.component';

import { TravelAdminDashboardComponent } from './features/travelAdmin/travel-admin-dashboard/travel-admin-dashboard.component';
import { TravelAdminIncomingTravelRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-incoming-travel-requests/travel-admin-incoming-travel-requests.component';
import { TravelAdminWaitingOptionsTravelRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-waiting-options-travel-requests/travel-admin-waiting-options-travel-requests.component';
import { TravelAdminSelectedOptionsTravelRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-selected-options-travel-requests/travel-admin-selected-options-travel-requests.component';
import { TravelAdminClosedTravelRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-closed-travel-requests/travel-admin-closed-travel-requests.component';
import { TravelAdminOngoingTravelComponent } from './features/travelAdmin/myRequests/travel-admin-ongoing-travel/travel-admin-ongoing-travel.component';
import { ManagerProfileComponent } from './features/manager/manager-profile/manager-profile.component';
import { TravelAdminProfileComponent } from './features/travelAdmin/travel-admin-profile/travel-admin-profile.component';
import { FinancePersonnelHomeComponent } from './components/layout/financePersonnel/finance-personnel-home/finance-personnel-home.component';
import { FinancePersonnelDashboardComponent } from './features/financePersonnel/finance-personnel-dashboard/finance-personnel-dashboard.component';
import { FinancePersonnelIncomingTravelSettlementsComponent } from './features/financePersonnel/settlements/finance-personnel-incoming-travel-settlements/finance-personnel-incoming-travel-settlements.component';
import { FinancePersonnelPendingTravelSettlementsComponent } from './features/financePersonnel/settlements/finance-personnel-pending-travel-settlements/finance-personnel-pending-travel-settlements.component';
import { FinancePersonnelClosedTravelSettlementsComponent } from './features/financePersonnel/settlements/finance-personnel-closed-travel-settlements/finance-personnel-closed-travel-settlements.component';
import { FinancePersonnelProfileComponent } from './features/financePersonnel/finance-personnel-profile/finance-personnel-profile.component';
import { ManagerOngoingTravelRequestsComponent } from './features/manager/travelRequests/manager-ongoing-travel-requests/manager-ongoing-travel-requests.component';
import { ReqFormComponent } from './features/manager/req-form/req-form.component';
import { TraveladminReqformComponent } from './features/travelAdmin/traveladmin-reqform/traveladmin-reqform.component';

import { ViewAvailableOptionsComponent } from './features/travelAdmin/travelRequests/view-available-options/view-available-options.component';
import { TravelAdminWaitingRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-waiting-options-travel-requests/travel-admin-waiting-requests/travel-admin-waiting-requests.component';
import { TravelAdminSelectedRequestsComponent } from './features/travelAdmin/travelRequests/travel-admin-selected-options-travel-requests/travel-admin-selected-requests/travel-admin-selected-requests.component';

  const routes: Routes = [
    { path: 'employee', component: EmployeeHomeComponent, children: [
      {path:'dashboard',component:EmployeeDashboardComponent},
      {path:'request',component:NewTravelRequestComponent},
      {path:'pending',component:EmployeePendingRequestsComponent },
      {path: 'available_options',component: OptionviewCardComponent},
      {path:'ongoing',component:EmployeeOngoingRequestsComponent},
      {path:'history',component:EmployeeClosedRequestsComponent},
      {path:'profile',component:EmployeeProfileComponent}
    ]},
    { path: 'manager', component: ManagerHomeComponent, children: [
      {path:'dashboard',component:ManagerDashboardComponent},
      {path:'newrequests',component:ManagerIncomingTravelRequestsComponent},
      {path:'forwarded',component:ManagerForwardedTravelRequestsComponent},
      {path:'ongoing',component:ManagerOngoingTravelRequestsComponent},
      {path:'closed',component:ManagerClosedTravelRequestsComponent},
      {path:'requestdetail',component:ReqFormComponent}
    ]},
    { path: 'traveladmin', component: TravelAdminHomeComponent, children: [
      {path: 'dashboard', component: TravelAdminDashboardComponent},
      {path: 'incomingrequests', component: TravelAdminIncomingTravelRequestsComponent},
      {path :'requestdetail',component:TraveladminReqformComponent},
      {path: 'waiting', component: TravelAdminWaitingOptionsTravelRequestsComponent, children: [
        {path:'', component:TravelAdminWaitingRequestsComponent},
        {path: 'available_options', component: ViewAvailableOptionsComponent}
      ]},
      {path: 'selected', component: TravelAdminSelectedOptionsTravelRequestsComponent, children: [
        {path:'',component: TravelAdminSelectedRequestsComponent},
        {path: 'available_options', component: ViewAvailableOptionsComponent}
      ]},
      {path: 'ongoing', component: TravelAdminOngoingTravelComponent},
      {path: 'closed', component: TravelAdminClosedTravelRequestsComponent},
      {path: 'profile', component: TravelAdminProfileComponent}
    ]},
    {path: 'finance', component: FinancePersonnelHomeComponent, children: [
      {path: 'dashboard', component: FinancePersonnelDashboardComponent},
      {path: 'incoming',component: FinancePersonnelIncomingTravelSettlementsComponent},
      {path: 'pending', component: FinancePersonnelPendingTravelSettlementsComponent},
      {path: 'closed', component: FinancePersonnelClosedTravelSettlementsComponent},
      {path: 'profile', component: FinancePersonnelProfileComponent}
    ]}

  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
