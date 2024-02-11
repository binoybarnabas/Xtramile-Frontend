import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeDashboardService } from 'src/app/services/employeeServices/dashboardServices/employee-dashboard.service';

@Component({
  selector: 'app-dashboard-upcoming-trip',
  templateUrl: './dashboard-upcoming-trip.component.html',
  styleUrls: ['./dashboard-upcoming-trip.component.css']
})
export class DashboardUpcomingTripComponent {
  countryName!: string;
  currentImageUrl!: string;
  employeeId: number=3;
  tripPurpose: string='';
  startDate: any;
  endDate: any;
  sourceCity: string='';
  sourceState: string='';
  sourceCountry: string='';
  destinationCity: string='';
  destinationState: string='';
  destinationCountry: string='';

  constructor(private http: HttpClient, private service:EmployeeDashboardService) {}

  ngOnInit() {
    this.service.getUpcomingTripDetails(this.employeeId).subscribe((data: any) => {
      console.log(data);
      this.tripPurpose = data[0].tripPurpose;
      this.startDate = data[0].startDate;
      this.endDate = data[0].endDate;
      this.sourceCity = data[0].sourceCity;
      this.sourceState = data[0].sourceState;
      this.sourceCountry = data[0].sourceCountry;
      this.destinationCity = data[0].destinationCity;
      this.destinationState = data[0].destinationState;
      this.destinationCountry = data[0].destinationCountry;
      console.log('destination country',this.destinationCountry);
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
