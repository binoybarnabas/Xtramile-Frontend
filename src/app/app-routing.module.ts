import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralInfoComponent } from './components/layout/employee/travel-request/general-info/general-info.component';
import { TripInfoComponent } from './components/layout/employee/travel-request/trip-info/trip-info.component';
import { AdditionalInfoComponent } from './components/layout/employee/travel-request/additional-info/additional-info.component';

const routes: Routes = [
  { path: 'user/info', component: GeneralInfoComponent },
  { path: 'user/tripinfo', component: TripInfoComponent },
  { path: 'user/otherinfo', component: AdditionalInfoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
