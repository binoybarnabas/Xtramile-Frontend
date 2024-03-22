import { Component } from '@angular/core';
import { ProgressCard } from 'src/app/services/interfaces/iProgressCard';

@Component({
  selector: 'app-dashboard-report-generator',
  templateUrl: './dashboard-report-generator.component.html',
  styleUrls: ['./dashboard-report-generator.component.css']
})
export class DashboardReportGeneratorComponent {

  progressCards: ProgressCard[] = [];

  currentYear = new Date().getFullYear();
  selectedReportYear: number;

  currentMonth: string;

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  selectedReportMonth: string;
  indexOfSelectedReportMonth: number;

  constructor() {

    this.selectedReportYear = new Date().getFullYear();

    const currentDateTime = new Date();
    this.currentMonth = this.months[currentDateTime.getMonth()];

    this.indexOfSelectedReportMonth = currentDateTime.getMonth();

    this.selectedReportMonth = this.currentMonth;

  }

  ngOnInit(): void {

    this.progressCards = [

      new ProgressCard("Users", 200, "cyan", "icon ri-user-line"),
      new ProgressCard("Bookings", 300, "red", "icon ri-calendar-event-line"),
      new ProgressCard("Locations", 15, "orange", "icon ri-map-pin-2-line"),
      new ProgressCard("Trips", 100, "green", "icon ri-plane-line"),
    ];

  }

  //upate selected month based on button clicks
  updateSelectedReportMonth(action: string) {

    if (action === 'plus') {
      //to limit the increment at current month and current year
      if (this.selectedReportYear === this.currentYear && this.selectedReportMonth === this.currentMonth) {
        return;
      }
      //months[11] will be December
      //So that December + 1 should be January
      if (this.indexOfSelectedReportMonth === 11) {
        this.updateSelectedReportYear('plus')
        this.selectedReportMonth = this.months[0];
        this.indexOfSelectedReportMonth = 0;
      }
      else {
        this.selectedReportMonth = this.months[this.indexOfSelectedReportMonth + 1]
        this.indexOfSelectedReportMonth += 1;
      }
    }
    else {
      //If Selected Month is January
      //Then January - 1 should be December
      if (this.indexOfSelectedReportMonth === 0) {
        this.updateSelectedReportYear('minus')
        this.selectedReportMonth = this.months[11]
        this.indexOfSelectedReportMonth = 11;
      } else {
        this.selectedReportMonth = this.months[this.indexOfSelectedReportMonth - 1]
        this.indexOfSelectedReportMonth -= 1;
      }

    }

  }

  //method to update selected year for generating report
  updateSelectedReportYear(action: string) {

    if (action === 'plus') {
      //not to increment from curent year
      if (this.selectedReportYear !== this.currentYear) {
        //not to increment from current month
        if (this.selectedReportMonth !== this.currentMonth) {

          this.selectedReportMonth = this.currentMonth;

        }

        this.selectedReportYear += 1;
      }

    }
    else {

      this.selectedReportYear -= 1;

    }

  }

  generateReport() {
    //api call to generate report
    //use selectedReportMonth, selectedReportYear variables to pass as arugments
    //download the report automatically once it is generated
  }
}
