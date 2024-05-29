import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-step-chart',
  templateUrl: './custom-step-chart.component.html',
  styleUrls: ['./custom-step-chart.component.css']
})
export class CustomStepChartComponent {
  @Input() steps: { label: string, description: string, status: 'completed' | 'current' | 'pending' | 'rejected', timestamp: string}[] = []; 
  
  @Input() currentColor: string = '#9a4cfa';
  @Input() pendingColor: string = '#e0e0e0';
  @Input() rejectedColor : string ='#ec0d0d';
  @Input() completedColor: string = '#4caf50';


  getBackgroundColor(status: 'completed' | 'current' | 'pending' | 'rejected'): string {
    
    switch (status) {
      case 'completed':
        return this.completedColor;
      case 'current':
        return this.currentColor;
      case 'rejected':
        return this.rejectedColor;
      case 'pending':
      default:
        return this.pendingColor;
    }
  }

  constructor(){

    this.steps = [
      { label: 'Step 1', description: 'Description for step 1', status: 'completed' , timestamp: 'Mon, 27th May \'24' },
      { label: 'Step 2', description: 'Description for step 2', status: 'completed' , timestamp: 'Mon, 27th May \'24'},
      { label: 'Step 3', description: 'Description for step 3', status: 'current' , timestamp: 'Mon, 27th May \'24'},
      { label: 'Step 4', description: 'Description for step 4', status: 'pending' , timestamp: 'Mon, 27th May \'24'},
      { label: 'Step 5', description: 'Description for step 5', status: 'rejected' , timestamp: 'Mon, 27th May \'24'}
    ];


  }

  
}
