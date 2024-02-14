import { Component, Input, SimpleChanges } from '@angular/core';
import { EmployeeDashboardService } from 'src/app/services/employeeServices/dashboardServices/employee-dashboard.service';

@Component({
  selector: 'app-dashboard-progress',
  templateUrl: './dashboard-progress.component.html',
  styleUrls: ['./dashboard-progress.component.css']
})
export class DashboardProgressComponent {
  @Input() employeeId: number = 0;
  currentStep: number = 0;

  // Define the steps array within the component
  steps = [
    { title: 'Request Submitted' },
    { title: 'Manager Forwarded' },
    { title: 'Travel Admin Forwarded' },
    { title: 'Finance Approved' },
    { title: 'Trip completed' }
  ];

  constructor(private service: EmployeeDashboardService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeId']) {
      this.fetchProgress();
    }
  }
  ngOnInit(){
    this.fetchProgress();
  }

  fetchProgress() {
    this.service.getRequestProgress(this.employeeId).subscribe((data: any) => {
      if (data) {
        console.log(data)
        switch (data.progress) {
          case 'Request Submitted':
            this.currentStep = 0;
            break;
          case 'Manager Forwarded':
            this.currentStep = 1;
            break;
          case 'Travel Admin Forwarded':
            this.currentStep = 2;
            break;
          case 'Finance Approved':
            this.currentStep = 3;
            break;
          case 'Trip Completed':
            this.currentStep = 4;
            break;
          case 'Manager Denied':
            this.currentStep = 0;
            break;
          case 'Travel Admin Denied':
            this.currentStep = 1;
            break;
          case 'Finance Denied':
            this.currentStep = 2;
            break;
          default:
            this.currentStep = -1; // Set to -1 or another suitable value for no progress
        }
      } else {
        this.currentStep = -1; // Set to -1 or another suitable value for no progress
      }
    });
  }
  

 getLineWidth(index: number): string {
  if (this.currentStep === -1) {
    return '0%'; // No request, no progress
  } else if (index < this.currentStep) {
    return '100%'; // Completed steps have full width
  } else if (index === this.currentStep) {
    return '40%'; // In-progress steps are half-filled
  } else {
    return '0%'; // Pending steps have no width
  }
}
}
