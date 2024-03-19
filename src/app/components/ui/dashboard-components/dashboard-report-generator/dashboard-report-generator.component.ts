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
    // Initialize the array with progress cards
    this.progressCards = [

      new ProgressCard("Users", 200, "cyan", "icon ri-user-line"),
      // Add more progress cards here
      new ProgressCard("Bookings", 300, "red", "icon ri-calendar-event-line"),
      new ProgressCard("Locations", 15, "orange", "icon ri-map-pin-2-line"),
      new ProgressCard("Trips", 100, "green", "icon ri-plane-line"),
    ];
  }

  updateSelectedReportMonth(action: string) {

    if (action === 'plus') {

      if (this.selectedReportYear === this.currentYear && this.selectedReportMonth === this.currentMonth) {
        return;
      }

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


  updateSelectedReportYear(action: string) {
    if (action === 'plus') {

      if (this.selectedReportYear !== this.currentYear) {
        if (this.selectedReportMonth !== this.currentMonth) {
          this.selectedReportMonth = this.currentMonth;
        }
        this.selectedReportYear += 1;
      }

    } else {
      this.selectedReportYear -= 1;
    }
  }

}
