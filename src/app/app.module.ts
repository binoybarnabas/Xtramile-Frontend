import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFieldComponent } from './components/ui/input-field/input-field.component';
import { ReqGeneralInfoComponent } from './components/layout/req-general-info/req-general-info.component';
import { EmployeeComponent } from './features/employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFieldComponent,
    ReqGeneralInfoComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
