import { Component, Input } from '@angular/core';
import { EmployeeDashboardService } from 'src/app/services/employeeServices/dashboardServices/employee-dashboard.service';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.css']
})
export class DashboardTableComponent {
  @Input() employeeId: number = 0;
  currentStep: number = 0;
  requestProgress!: any[];


  constructor(private service: EmployeeDashboardService) {}

  ngOnInit(){
    this.fetchProgress();
  }

  fetchProgress() {
  this.service.getRequestProgress(this.employeeId).subscribe(
    (data: any[]) => {

      this.requestProgress=data;
      console.log('progress data',data)
    },
    (error) => {
      console.error('Error fetching completed trips:', error);
    }
  );
}
}
