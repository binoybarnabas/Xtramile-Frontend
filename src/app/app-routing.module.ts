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
import { TravelAdminOngoingTravelComponent } from './features/travelAdmin/myRequests/travel-admin-ongoing-travel/travel-admin-ongoing-travel.component';
import { TravelAdminHomeComponent } from './components/layout/travelAdmin/travel-admin-home/travel-admin-home.component';
import { ManagerOngoingTravelRequestsComponent } from './features/manager/travelRequests/manager-ongoing-travel-requests/manager-ongoing-travel-requests.component';

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
    ]}
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
