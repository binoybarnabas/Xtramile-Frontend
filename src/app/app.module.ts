import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFieldComponent } from './components/ui/input-field/input-field.component';
import { EmployeeComponent } from './features/employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SideNavBarComponent } from './components/layout/employee/employee-home/side-nav-bar/side-nav-bar.component';
import { TopBarComponent } from './components/layout/employee/employee-home/top-bar/top-bar.component';
import { MiddleConsoleComponent } from './components/layout/employee/employee-home/middle-console/middle-console.component';
import { EmployeeHomeComponent } from './components/layout/employee/employee-home/employee-home.component';
import { NewTravelRequestComponent } from './features/employee/myRequests/new-travel-request/new-travel-request.component';
import { ManagerSideNavBarComponent } from './components/layout/manager/manager-home/manager-side-nav-bar/manager-side-nav-bar.component';
import { ManagerTopBarComponent } from './components/layout/manager/manager-home/manager-top-bar/manager-top-bar.component';
import { ManagerMiddleConsoleComponent } from './components/layout/manager/manager-home/manager-middle-console/manager-middle-console.component';
import { ManagerHomeComponent } from './components/layout/manager/manager-home/manager-home.component';
import { TravelAdminHomeComponent } from './components/layout/travelAdmin/travel-admin-home/travel-admin-home.component';
import { TravelAdminSideNavBarComponent } from './components/layout/travelAdmin/travel-admin-home/travel-admin-side-nav-bar/travel-admin-side-nav-bar.component';
import { TravelAdminTopBarComponent } from './components/layout/travelAdmin/travel-admin-home/travel-admin-top-bar/travel-admin-top-bar.component';
import { TravelAdminMiddleConsoleComponent } from './components/layout/travelAdmin/travel-admin-home/travel-admin-middle-console/travel-admin-middle-console.component';
import { FinancePersonnelHomeComponent } from './components/layout/financePersonnel/finance-personnel-home/finance-personnel-home.component';
import { FinancePersonnelSideNavBarComponent } from './components/layout/financePersonnel/finance-personnel-home/finance-personnel-side-nav-bar/finance-personnel-side-nav-bar.component';
import { FinancePersonnelTopBarComponent } from './components/layout/financePersonnel/finance-personnel-home/finance-personnel-top-bar/finance-personnel-top-bar.component';
import { FinancePersonnelMiddleConsoleComponent } from './components/layout/financePersonnel/finance-personnel-home/finance-personnel-middle-console/finance-personnel-middle-console.component';


@NgModule({
  declarations: [
    AppComponent,
    InputFieldComponent,
    EmployeeComponent,

    SideNavBarComponent,
    TopBarComponent,
    MiddleConsoleComponent,
    EmployeeHomeComponent,
    NewTravelRequestComponent,
    ManagerHomeComponent,
    ManagerSideNavBarComponent,
    ManagerTopBarComponent,
    ManagerMiddleConsoleComponent,
    TravelAdminHomeComponent,
    TravelAdminSideNavBarComponent,
    TravelAdminTopBarComponent,
    TravelAdminMiddleConsoleComponent,
    FinancePersonnelHomeComponent,
    FinancePersonnelSideNavBarComponent,
    FinancePersonnelTopBarComponent,
    FinancePersonnelMiddleConsoleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
