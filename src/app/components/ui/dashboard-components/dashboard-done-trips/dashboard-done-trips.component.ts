import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private employeeService: EmployeeDashboardService, private router: Router) { }

  ngOnInit(): void {
    // Call getCompletedTrips method from EmployeeService to fetch completed trips
    this.employeeService.getCompletedTrips(this.empId).subscribe(
      (data) => {
        // Assign the fetched data to completedTrips array
        this.completedTrips = data.completedTrips;
        this.totalCount=data.totalCount;
        console.log('completed trips',this.completedTrips)
      },
      (error) => {
        console.error('Error fetching completed trips:', error);
      }
    );
  }
  viewDoneTripDetails() {
    this.router.navigate(['/employee/history']);
  }
}
