import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomLoaderService } from 'src/app/services/commonUIServices/custom-loader-service/custom-loader.service';
import { EmployeeDashboardService } from 'src/app/services/employeeServices/dashboardServices/employee-dashboard.service';


@Component({
  selector: 'app-dashboard-done-trips',
  templateUrl: './dashboard-done-trips.component.html',
  styleUrls: ['./dashboard-done-trips.component.css']
})
export class DashboardDoneTripsComponent implements OnInit {
  @Input() empId: number = 0;
  completedTrips: any[] = []; 
  totalCount:number=0;

  constructor(private employeeService: EmployeeDashboardService, private router: Router, private loaderService : CustomLoaderService) { }

  ngOnInit(): void {

    this.loaderService.show();

    // Call getCompletedTrips method from EmployeeService to fetch completed trips
    this.employeeService.getCompletedTrips(this.empId).subscribe(
      (data) => {

        this.loaderService.hide();

        // Assign the fetched data to completedTrips array
        this.completedTrips = data.completedTrips;
        this.totalCount=data.totalCount;
        console.log('completed trips',this.completedTrips)
      },
      (error) => {

        this.loaderService.hide();

        console.error('Error fetching completed trips:', error);
      }
    );
  }
  viewDoneTripDetails() {
    this.router.navigate(['/employee/history']);
  }
}
