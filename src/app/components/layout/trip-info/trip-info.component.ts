import { Component } from '@angular/core';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})
export class TripInfoComponent {
  LeftTextFields = ["First Name","Phone","Address line 1","Department","Project Name"]
  RightTextFields = ["Last Name","Email","Address line 2","Project ID","Reports To"]
}
