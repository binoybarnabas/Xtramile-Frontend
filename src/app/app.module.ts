import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFieldComponent } from './components/ui/input-field/input-field.component';
import { EmployeeComponent } from './features/employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TripInfoComponent } from './components/layout/employee/travel-request/trip-info/trip-info.component';
import { GeneralInfoComponent } from './components/layout/employee/travel-request/general-info/general-info.component';
import { AdditionalInfoComponent } from './components/layout/employee/travel-request/additional-info/additional-info.component';
import { RequestComponent } from './components/layout/employee/travel-request/request/request.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SideNavBarComponent } from './components/layout/employee/side-nav-bar/side-nav-bar.component';
import { TopBarComponent } from './components/layout/employee/top-bar/top-bar.component';
import { EmployeeHomeComponent } from './components/layout/employee/employee-home/employee-home.component';


@NgModule({
  declarations: [
    AppComponent,
    InputFieldComponent,
    EmployeeComponent,
    TripInfoComponent,
    GeneralInfoComponent,
    AdditionalInfoComponent,
    RequestComponent,
    SideNavBarComponent,
    TopBarComponent,
    EmployeeHomeComponent

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
