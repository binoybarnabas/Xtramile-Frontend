import { Component } from '@angular/core';

@Component({
  selector: 'app-traveller-dashboard',
  templateUrl: './traveller-dashboard.component.html',
  styleUrls: ['./traveller-dashboard.component.css']
})
export class TravellerDashboardComponent {

  // totalDays: number = 10;
  // remainingDays: number = 7;
  employeeId = 12;

  dashboardTableBody: string = 'requests';

  changeDashboardTableBody(content: string) {
    this.dashboardTableBody = content;
  }




}
