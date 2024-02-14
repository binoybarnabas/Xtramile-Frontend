import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { EmployeeDashboardService } from 'src/app/services/employeeServices/dashboardServices/employee-dashboard.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  employeeId:number=15;
  cardTitles: string[] = [];
  cardData: string[] = [];
  showModal: boolean = false;
  empId= 0;

 

constructor(private service: EmployeeDashboardService, private commonService : CommonAPIService) {
  this.fetchProgress();
}

fetchProgress() {
  // Fetch progress data from the service based on 'employeeId'
  this.service.getRequestProgress(this.employeeId).subscribe((data: any) => {
    if (data) {
      // Assuming 'status' and 'requestCode' are properties in the 'data' object
      this.cardTitles.push(data.requestCode);
      this.cardData.push(data.status);
    }
  });
}
onClickCard() {
  // Set the flag to show the modal
  this.showModal = true;
}

closeModal() {
  // Set the flag to hide the modal
  this.showModal = false;
}

ngOnInit(){
  if(localStorage.getItem('userData')){
    const userData= JSON.parse(localStorage.getItem('userData')!)
    this.empId=userData.empId;
  }
}
}
