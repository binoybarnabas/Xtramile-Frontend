import { Component, EventEmitter, Input, Output } from '@angular/core';
import { filter } from 'd3';

@Component({
  selector: 'app-tabbed-data-table',
  templateUrl: './tabbed-data-table.component.html',
  styleUrls: ['./tabbed-data-table.component.css']
})


export class TabbedDataTableComponent {

@Input() tabs: any[] = [];
@Input() filters: any[] = [];
@Input() isSearchFilterNeeded: string;

@Output() filterToggled: EventEmitter<any> = new EventEmitter<any>();


activeTabIndex: number = 0; // Initially set to show the first tab

constructor(){
  this.isSearchFilterNeeded = 'yes';
}

//method to toggle filters
//multiple items can be selected
toggleFilter(filterId:string){
  for(let i=0; i< this.filters.length; i++){
    if(this.filters[i].filterId !== filterId){
      if(this.filters[i].isActive === 'yes'){    
        this.filters[i].isActive = 'no';    
      }
    }
    if(this.filters[i].filterId === filterId){    
      if(this.filters[i].isActive === 'yes'){    
        this.filters[i].isActive = 'no';    
      }
      else{    
        this.filters[i].isActive = 'yes';        
      }
      this.filterToggled.emit(filterId);      
    } 
  }
}



}
