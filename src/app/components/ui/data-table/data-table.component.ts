import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {

  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() displayedProperties: string[] = [];
  @Input() sortOptions: string[]=[]
  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

}
