import { Component } from '@angular/core';

@Component({
  selector: 'app-traveller-dashboard',
  templateUrl: './traveller-dashboard.component.html',
  styleUrls: ['./traveller-dashboard.component.css']
})
export class TravellerDashboardComponent {

  // totalDays: number = 10;
  // remainingDays: number = 7;
  employeeId: number = 0;

  dashboardTableBody: string = 'requests';

  changeDashboardTableBody(content: string) {
    this.dashboardTableBody = content;
  }
  ngOnInit() {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData')!)
      this.employeeId = userData.empId;
    }
  }




}
