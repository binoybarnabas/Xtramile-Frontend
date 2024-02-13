import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeDashboardService } from 'src/app/services/employeeServices/dashboardServices/employee-dashboard.service';

@Component({
  selector: 'app-dashboard-upcoming-trip',
  templateUrl: './dashboard-upcoming-trip.component.html',
  styleUrls: ['./dashboard-upcoming-trip.component.css']
})
export class DashboardUpcomingTripComponent {
  @Input() employeeId: number = 0;
  countryName!: string;
  currentImageUrl!: string;
  tripPurpose: string = '';
  startDate: any;
  endDate: any;
  sourceCity: string = '';
  sourceState: string = '';
  sourceCountry: string = '';
  destinationCity: string = '';
  destinationState: string = '';
  destinationCountry: string = '';
  tripDetailsAvailable: boolean = true; // Flag to check if trip details are available

  constructor(private service: EmployeeDashboardService,private router: Router) {}

  ngOnInit() {
    // Fetch upcoming trip details using the employeeId
    this.service.getUpcomingTripDetails(this.employeeId).subscribe(
      (data: any) => {
        // Log the fetched data
        console.log(data);

        if (data!=null) {
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
          this.service.getCountryImage().subscribe(
            (countryData: any) => {
              // Find the specific country in the data
              const country = countryData.find(
                (c: { countryName: string }) =>
                  c.countryName === this.destinationCountry
              );

              // If the country is found, set the values for countryName and currentImageUrl
              if (country) {
                this.countryName = country.countryName;
                this.currentImageUrl = country.touristPlaceImageUrl;
              }
            },
            (error) => {
              console.error('Error fetching country image data:', error);
            }
          );
        } else {
          // Set the flag to indicate that no trip details are available
          this.tripDetailsAvailable = false;
        }
      },
      (error) => {
        console.error('Error fetching upcoming trip details:', error);
      }
    );
  }
  viewOngoingDetails() {
    this.router.navigate(['/employee/ongoing']);
    }
}
