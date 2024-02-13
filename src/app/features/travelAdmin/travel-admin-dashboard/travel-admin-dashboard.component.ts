import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TravelAdminDashboardService } from 'src/app/services/travelAdminServices/dashboardServices/travel-admin-dashboard.service';
// import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-travel-admin-dashboard',
  templateUrl: './travel-admin-dashboard.component.html',
  styleUrls: ['./travel-admin-dashboard.component.css']
})
export class TravelAdminDashboardComponent{
  projectCodes:any[] =[];
  monthReportUrl: string | undefined;
  selectedMonth: string = '';
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  projectReportUrl: string | undefined;
  selectedProject: any;
  completedTripsData :any;
  private subscription: Subscription | any
  
  constructor(private apiservice: TravelAdminDashboardService, private router: Router){
  }
  ngOnInit(){
    //api service to receive all projects.    
        this.apiservice.getAllProjects().subscribe((data:any)=>{
          this.projectCodes = data
          console.log(this.projectCodes)      
        })

    //api service to get requests for each month
        this.subscription = this.apiservice.getAllRequestsMonthly().subscribe((data: any) =>
        {
          this.completedTripsData = data;
          console.log(this.completedTripsData )
        });
    
    
  }

  //to generate a report by inputting a month
  generateMonthlyModeReport() {
    this.apiservice.generateMonthlyModeReport(this.selectedMonth).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        this.monthReportUrl = url;
      },
    );
  }

  //to bind the project id of selected project code and call generateProjectModeReport()
  onProjectSelect(selectedProject: any) {
   
        const projectId = selectedProject.item.projectId; // Access projectId property 
        this.generateProjectModeReport(projectId);      
  }

  //to generate a report based on the input projectId 
  generateProjectModeReport(projectId: number){
    console.log(projectId)
    this.apiservice.generateProjectModeReport(projectId).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        this.projectReportUrl = url;
      },
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}