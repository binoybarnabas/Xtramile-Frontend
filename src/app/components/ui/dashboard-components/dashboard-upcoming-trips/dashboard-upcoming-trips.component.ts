import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, takeUntil } from 'rxjs';
import { EmployeeDashboardService } from 'src/app/services/employeeServices/dashboardServices/employee-dashboard.service';

@Component({
  selector: 'app-dashboard-upcoming-trips',
  templateUrl: './dashboard-upcoming-trips.component.html',
  styleUrls: ['./dashboard-upcoming-trips.component.css']
})
export class DashboardUpcomingTripsComponent {
  @Input() employeeId: number = 0;
  countryName!: string;
  currentImageUrl!: string;
  tripPurpose: string = '';
  startDate: any;
  endDate: any;
  sourceCity: string = '';
  sourceCountry: string = '';
  destinationCity: string = '';
  destinationCountry: string = '';
  tripDetailsAvailable: boolean = true; // Flag to check if trip details are available
  trips: any[] = []; // Array to store upcoming trips
  currentIndex: number = 0;
  private destroy$ = new Subject<void>();
  constructor(private service: EmployeeDashboardService, private router: Router) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    // Fetch upcoming trip details using the employeeId
    this.service.getUpcomingTripDetails(this.employeeId).subscribe(
      (data: any[]) => {
        // Log the fetched data
        console.log('upcoming trips:', data);
        
        if (data.length > 0) {
          // Assign fetched data to trips array
          this.trips = data;
          this.loadCurrentTrip(); // Load the current trip details

          // Automatically cycle through trips every 5 seconds
          interval(10000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.nextTrip();
            });
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

  loadCurrentTrip() {
    const currentTrip = this.trips[this.currentIndex];
    if (currentTrip && new Date(currentTrip.startDate) >= new Date()) {
      this.tripPurpose = currentTrip.tripPurpose;
      this.startDate = currentTrip.startDate;
      this.endDate = currentTrip.endDate;
      this.sourceCity = currentTrip.sourceCity;
      this.sourceCountry = currentTrip.sourceCountry;
      this.destinationCity = currentTrip.destinationCity;
      this.destinationCountry = currentTrip.destinationCountry;
  
      // Fetch country image data
      this.service.getCountryImage().subscribe(
        (countryData: any[]) => {
          // Find the specific country in the data
          const country = countryData.find(
            (c: { countryName: string }) =>
              c.countryName === this.destinationCountry
          );
          console.log('country data',countryData)
  
          // If the country is found, set the values for countryName and currentImageUrl
          if (country) {
            this.countryName = country.countryName;
            // Find the city in the country's cities array
            const city = country.cities.find((c: { cityName: string }) => c.cityName === this.destinationCity);
            if (city) {
              // Use city image if available
              this.currentImageUrl = city.touristPlaceImageUrl;
            } else {
              // Use country image if city image is not available
              this.currentImageUrl = country.touristPlaceImageUrl;
            }
          }
        },
        (error) => {
          console.error('Error fetching country image data:', error);
        }
      );
    } else {
      this.tripDetailsAvailable = false;
    }
  }
  

  // Function to navigate to the next trip
  nextTrip() {
    if (this.currentIndex < this.trips.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;  // Reset to the first trip when reaching the end
    }
    this.loadCurrentTrip();
  }

  // Function to navigate to the previous trip
  previousTrip() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadCurrentTrip();
    }
  }
  viewOngoingDetails() {
    this.router.navigate(['/employee/ongoing']);
  }

}
