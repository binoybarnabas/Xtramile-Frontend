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
  @Output() cardClick: EventEmitter<void> = new EventEmitter<void>();

   get showScrollbar(): boolean {
    return this.titles.length > 1;
  }

  onCardClick() {
    // Emit the event to show the modal
    this.cardClick.emit();
  }
}
