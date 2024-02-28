import { Component } from '@angular/core';

@Component({
  selector: 'app-travel-request-form',
  templateUrl: './travel-request-form.component.html',
  styleUrls: ['./travel-request-form.component.css']
})
export class TravelRequestFormComponent {


  isProjectDetailsSectionOpen: boolean;
  selectedPassportFileName: any;
  selectedTravelAuthMailFileName: any;

  selectedTripType: string = 'round_trip';

  selectedTravelMode: string = 'flight';

  selectedOrigin: string = 'Trivandrum';
  selectedDestination: string = 'Kochi';


  constructor() {
    this.isProjectDetailsSectionOpen = false;
  }

  toggleProjectDetailsSection(value: string) {
    if (value === 'open') {
      this.isProjectDetailsSectionOpen = true;
    } else {
      this.isProjectDetailsSectionOpen = false;
    }
  }



  displayFileName(event: any, fileItem: string) {
    const fileInput = event.target;
    // this.selectedPassportFileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';

    if (fileItem === 'passport') {
      this.selectedPassportFileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';
    } else {

      this.selectedTravelAuthMailFileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';

    }

  }


  //change trip type based on user seleciton
  changeTripType(tripType: string) {
    this.selectedTripType = tripType;
  }

  changeTravelMode(travelMode: string) {
    this.selectedTravelMode = travelMode;
  }


  //function to swap entered origin and destinaiton
  //invoked on a two way arrow button click
  swapOriginAndDestination() {
    const temp = this.selectedDestination;
    this.selectedDestination = this.selectedOrigin;
    this.selectedOrigin = temp;
  }


  //eof
}
