import { Component } from '@angular/core';
import { EmployeeDashboardService } from 'src/app/services/employeeServices/dashboardServices/employee-dashboard.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  employeeId:number=21;
  cardTitles: string[] = [];
  cardData: string[] = [];
  showModal: boolean = false;
  currentCountry: string='';
  totalDays: number = 0;
  remainingDays: number = 0;
  startDate: any;
  endDate: any;

constructor(private service: EmployeeDashboardService) {
  this.fetchProgress();
  this.fetchCountryName();
  this.fetchGaugeData();
}

fetchProgress() {
  // Fetch progress data from the service based on 'employeeId'
  this.service.getRequestProgress(this.employeeId).subscribe((data: any) => {
    if (data) {
      // Assuming 'status' and 'requestCode' are properties in the 'data' object
      this.cardTitles.push(data.requestCode);
      this.cardData.push(data.status);
    }
  });
}
onClickCard() {
  // Set the flag to show the modal
  this.showModal = true;
}

closeModal() {
  // Set the flag to hide the modal
  this.showModal = false;
}
fetchCountryName() {
  this.service.getUpcomingTripDetails(this.employeeId).subscribe((data: any) => {
    if (data) {
      this.currentCountry = data[0].destinationCountry;
    } else {
      // Set a default country or an empty string when there is no data
      this.currentCountry = ''; 
    }
  });
}
fetchGaugeData() {
  this.service.getUpcomingTripDetails(this.employeeId).subscribe((data: any) => {
    if (data) {
      this.startDate = new Date(data[0].startDate);
      this.endDate = new Date(data[0].endDate);
      
      // Calculate totalDays and remainingDays
      const currentDate = new Date();
      const totalMilliseconds = this.endDate.getTime() - this.startDate.getTime();
      const remainingMilliseconds = this.endDate.getTime() - currentDate.getTime();

      // Calculate totalDays and remainingDays based on milliseconds
      this.totalDays = Math.ceil(totalMilliseconds / (1000 * 60 * 60 * 24));
      this.remainingDays = Math.ceil(remainingMilliseconds / (1000 * 60 * 60 * 24));

      // Check if remainingDays is less than 0 and set it to 0
      if (this.remainingDays < 0) {
        this.remainingDays = 0;
        // Display an appropriate message or handle as needed
        console.log('The trip is already completed.');
      }
    }
  });
}

}
