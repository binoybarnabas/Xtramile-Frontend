import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent {
  @Input() titles: string[] = [];
  @Input() data: string[] = [];
  @Input() employeeId: number = 0;
  @Output() cardClick: EventEmitter<string> = new EventEmitter<string>();

   get showScrollbar(): boolean {
    return this.titles.length > 1;
  }

  onCardClick(clickedData: string) {
    // Emit the event to show the modal
    this.cardClick.emit(clickedData);
    
    console.log('modal req code',clickedData)
  }
}
