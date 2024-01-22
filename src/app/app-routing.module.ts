import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralInfoComponent } from './components/layout/general-info/general-info.component';
import { TripInfoComponent } from './components/layout/trip-info/trip-info.component';
import { AdditionalInfoComponent } from './components/layout/additional-info/additional-info.component';

const routes: Routes = [
  {path:'user/info', component:GeneralInfoComponent},
  {path:'user/tripinfo', component:TripInfoComponent},
  {path:'user/otherinfo', component:AdditionalInfoComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
