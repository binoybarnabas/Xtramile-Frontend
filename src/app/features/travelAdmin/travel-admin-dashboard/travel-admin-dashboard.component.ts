import { Component } from '@angular/core';

@Component({
  selector: 'app-travel-admin-dashboard',
  templateUrl: './travel-admin-dashboard.component.html',
  styleUrls: ['./travel-admin-dashboard.component.css']
})
export class TravelAdminDashboardComponent {


  dashboardTableBody: string = 'incoming_requests';

  changeDashboardTableBody(content: string) {
    this.dashboardTableBody = content;
  }


}