import { Component } from '@angular/core';

@Component({
  selector: 'app-req-general-info',
  templateUrl: './req-general-info.component.html',
  styleUrls: ['./req-general-info.component.css']
})
export class ReqGeneralInfoComponent {
  SublistData = ["General information","Trip information","Additional Information"]
  LeftTextFields = ["First Name","Phone","Address line 1","Department","Project Name"]
  RightTextFields = ["Last Name","Email","Address line 2","Project ID","Reports To"]
  SourceData = ["CitySource","StateSource","CountrySource"]
  DestinationData = ["CityDestination","StateDestination","CountryDestination"]
}
