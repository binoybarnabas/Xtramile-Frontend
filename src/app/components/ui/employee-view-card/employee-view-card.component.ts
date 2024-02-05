import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-employee-view-card',
  templateUrl: './employee-view-card.component.html',
  styleUrls: ['./employee-view-card.component.css']
})
export class EmployeeViewCardComponent {

  @Input() titles : string[] = []
  @Input() data : any[] = []
  @Input() titlePropertyMappings: { [key: string]: string } = {};
  @Input() buttonNeeded : boolean = false;
  @Output() buttonClickEvent = new EventEmitter<number>();

  getPropertyByTitle(item: any, title: string): any {
    const propertyName = this.titlePropertyMappings[title]
    return item[propertyName];
  }

  onButtonClick(requestId: number){
    this.buttonClickEvent.emit(requestId);
  }

}
