import { Component, Input } from '@angular/core';
import { filter } from 'd3';

@Component({
  selector: 'app-tabbed-data-table',
  templateUrl: './tabbed-data-table.component.html',
  styleUrls: ['./tabbed-data-table.component.css']
})


export class TabbedDataTableComponent {

@Input() tabs: any[] = [];
@Input() filters: any[] = [];

activeTabIndex: number = 0; // Initially set to show the first tab

constructor(){

}

//method to toggle filters
//multiple items can be selected
toggleFilter(filterId:string){

    for(let i=0; i< this.filters.length; i++){
    
      if(this.filters[i].filterId === filterId){
    
        if(this.filters[i].isActive === 'yes'){
    
          this.filters[i].isActive = 'no';
    
        }
        else{
    
          this.filters[i].isActive = 'yes';
        
        }
      
      }
 
    }
}


}
