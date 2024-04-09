import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { blob, filter } from 'd3';

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
@Output() search: EventEmitter<any> = new EventEmitter<any>();
@Output() rowClick: EventEmitter<any> = new EventEmitter<any>();
@Output() tabChange: EventEmitter<any> = new EventEmitter<any>();


activeTabIndex: number = 0; // Initially set to show the first tab
searchInputValue: string = ''

constructor(private http: HttpClient){
  this.isSearchFilterNeeded = 'yes';
}

//method to toggle filters
//multiple items can be selected
toggleFilter(filterId:string){
  this.searchInputValue = '';  
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

onSearch(){
  this.search.emit(this.searchInputValue);
}

onDownloadFileClick(url: string, docType: string, employeeName: string){
  this.http.get(url, {responseType: 'blob'}).subscribe({
    next: (data: Blob) =>{
      const blob = new Blob([data], {type: data.type});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${employeeName}_${docType}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);      
    },
    error: (error : Error) => {
      console.error("Error Downloading File");
      console.error(error.message);
    },
    complete: () => {
    }
  })
}

onRowClick(row: any){
  this.rowClick.emit(row);
}

onTabChange(index: number){
  this.activeTabIndex = index;
  this.tabChange.emit(this.activeTabIndex);
}
}
