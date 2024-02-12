import { Component, Input } from '@angular/core';
import { EmployeeDashboardService } from 'src/app/services/employeeServices/dashboardServices/employee-dashboard.service';

@Component({
  selector: 'app-dashboard-upcoming-trip',
  templateUrl: './dashboard-upcoming-trip.component.html',
  styleUrls: ['./dashboard-upcoming-trip.component.css']
})
export class DashboardUpcomingTripComponent {
  
  // Input property to receive employeeId from parent component
  @Input() employeeId: number = 0;

  // Properties to store trip details
  countryName!: string;
  currentImageUrl!: string;
  tripPurpose: string='';
  startDate: any;
  endDate: any;
  sourceCity: string='';
  sourceState: string='';
  sourceCountry: string='';
  destinationCity: string='';
  destinationState: string='';
  destinationCountry: string='';

  constructor(private service: EmployeeDashboardService) {}

  ngOnInit() {
    // Fetch upcoming trip details using the employeeId
    this.service.getUpcomingTripDetails(this.employeeId).subscribe((data: any) => {
      // Log the fetched data
      console.log(data);

      // Assign fetched data to component properties
      this.tripPurpose = data[0].tripPurpose;
      this.startDate = data[0].startDate;
      this.endDate = data[0].endDate;
      this.sourceCity = data[0].sourceCity;
      this.sourceState = data[0].sourceState;
      this.sourceCountry = data[0].sourceCountry;
      this.destinationCity = data[0].destinationCity;
      this.destinationState = data[0].destinationState;
      this.destinationCountry = data[0].destinationCountry;

      // Fetch country image data
      this.service.getCountryImage().subscribe((data: any) => {
        // Find the specific country in the data
        const countryData = data.find((country: { countryName: string; }) => country.countryName === this.destinationCountry);
    
        // If the country is found, set the values for countryName and currentImageUrl
        if (countryData) {
          this.countryName = countryData.countryName;
          this.currentImageUrl = countryData.touristPlaceImageUrl;
        }
      });
    });  
  }
}
