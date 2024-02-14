import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dashboard-gauge',
  templateUrl: './dashboard-gauge.component.html',
  styleUrls: ['./dashboard-gauge.component.css']
})
export class DashboardGaugeComponent implements OnChanges {
  @Input() totalDays: number = 0; // Set the total number of days
  @Input() remainingDays: number = 0; // Set the remaining number of days

  gaugeColor: string = '#2bb2fe'; // Initial color
  needleRotation: number = 0; // Initial rotation

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalDays'] || changes['remainingDays']) {
      this.updateGaugeColor();
    }
  }

  updateGaugeColor(): void {
    const totalDays = this.totalDays;
    const remainingDays = this.remainingDays;
    const color = '#2bb2fe';
    
    // Calculate the angle to be reduced per spent day
    const anglePerDay = 180 / totalDays;
    
    // Calculate the total angle to be reduced based on spent days
    const totalReducedAngle = anglePerDay * (totalDays - remainingDays);
    
    // Calculate the starting and ending degrees based on the total reduced angle
    const startDegree = 90 - totalReducedAngle;

    // Update needle rotation based on the startDegree
    this.needleRotation = startDegree;

    // Create a conic gradient with two colors, starting from the bottom
    this.gaugeColor = `conic-gradient(
      from ${startDegree}deg at 50% 100%, /* Start from the bottom */
      #e0e0e0 0deg 180deg, /* Fill the lower half with #e0e0e0 */
      ${color} 180deg 360deg /* Fill the upper half with lightblue */
    )`;
  }
}
