import { Component } from '@angular/core';

@Component({
  selector: 'app-travel-request-form',
  templateUrl: './travel-request-form.component.html',
  styleUrls: ['./travel-request-form.component.css']
})
export class TravelRequestFormComponent {


  isProjectDetailsSectionOpen: boolean;
  selectedFileName: any;

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



  displayFileName(event: any) {
    const fileInput = event.target;
    this.selectedFileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';
  }
  //eof
}
