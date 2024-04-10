import { Component, Input } from '@angular/core';
import { EmployeeDashboardService } from 'src/app/services/employeeServices/dashboardServices/employee-dashboard.service';
import { Notification } from 'src/app/services/interfaces/iNotification';

@Component({
  selector: 'app-traveller-dashboard',
  templateUrl: './traveller-dashboard.component.html',
  styleUrls: ['./traveller-dashboard.component.css']
})
export class TravellerDashboardComponent {

  // totalDays: number = 10;
  // remainingDays: number = 7;
  employeeId: number = 0;
  notifications: Notification[] = [];

  dashboardTableBody: string = 'requests';

  constructor(private employeeDashboardService:EmployeeDashboardService){
  }

  changeDashboardTableBody(content: string) {
    this.dashboardTableBody = content;
  }

  ngOnInit() {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData')!)
      this.employeeId = userData.empId;
    }

    this.employeeDashboardService.getNotification(this.employeeId).subscribe({
      next:(data)=>{
        this.notifications = data
        console.log("notifications",this.notifications);
      },
      error:(error:Error)=>{
        console.log(error);
      }
    });
  }

}
