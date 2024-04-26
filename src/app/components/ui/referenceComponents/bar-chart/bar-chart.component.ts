// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import Chart from 'chart.js/auto';
// import { TravelAdminDashboardService } from 'src/app/services/travelAdminServices/dashboardServices/travel-admin-dashboard.service';

// @Component({
//   selector: 'app-bar-chart',
//   templateUrl: './bar-chart.component.html',
//   styleUrls: ['./bar-chart.component.css']
// })
// export class BarChartComponent {
//   @Input() completedTripsData:any;
//   currentStartIndex = 0;
//   tripChart: any;

//   ngOnInit(){
//     this.renderChart(this.currentStartIndex);
//   }

//   ngOnDestroy() {
//     this.destroyChart();
//   }

//   destroyChart() {
//     if (this.tripChart) {
//       this.tripChart.destroy();
//     }
//   }
//   //to generate chart using chart js
//   renderChart(startIndex: number) {
//     if (!this.completedTripsData) {
//       return; // Exit early if data is not available
//     }
//     const months = Object.keys(this.completedTripsData);
//     const completedTrips = Object.values(this.completedTripsData);

//     const endIndex = Math.min(startIndex + 4, months.length);

//     this.destroyChart();
//     const ctx = document.getElementById('tripChart') as HTMLCanvasElement;
//     this.tripChart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: months.slice(startIndex, endIndex),
//         datasets: [{
//           label: 'Completed Trips',
//           data: completedTrips.slice(startIndex, endIndex),
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1
//         }]
//       },
//       options: 
//       {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });
//   }
//   onNextClick = () => {
//     if (this.currentStartIndex + 4 < Object.keys(this.completedTripsData).length) {
//       this.currentStartIndex += 4;
//       this.renderChart(this.currentStartIndex);
//     }
//   }

//   //function to call on forward button click
//   onPrevClick = () => {
//     if (this.currentStartIndex - 4 >= 0) {
//       this.currentStartIndex -= 4;
//       this.renderChart(this.currentStartIndex);
//     }
//   }
// }
