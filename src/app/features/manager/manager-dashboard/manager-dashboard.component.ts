import { Component } from '@angular/core';
import { ManagerDashboardService } from 'src/app/services/managerServices/dashboardServices/manager-dashboard.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent {

  completedTripsData :any;
  empId:number =7;
  constructor(private apiservice: ManagerDashboardService){

  }
  ngOnInit(){
    this.apiservice.getAllRequestsMonthly(this.empId).subscribe((data: any) =>
    {
      this.completedTripsData = data;
      console.log(this.completedTripsData )
    });
  }
}
