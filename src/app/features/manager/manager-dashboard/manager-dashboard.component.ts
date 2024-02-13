import { Component } from '@angular/core';
import { ManagerDashboardService } from 'src/app/services/managerServices/dashboardServices/manager-dashboard.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent {

  completedTripsData :any;
  empId!:number;
  constructor(private apiservice: ManagerDashboardService){
    const userData = localStorage.getItem('userData');
    if(userData){
      const userParsedData = JSON.parse(userData);
      this.empId = userParsedData.empId;
    }
  }
  ngOnInit(){
    this.apiservice.getAllRequestsMonthly(this.empId).subscribe((data: any) =>
    {
      this.completedTripsData = data;
      console.log(this.completedTripsData )
    });
  }
}
