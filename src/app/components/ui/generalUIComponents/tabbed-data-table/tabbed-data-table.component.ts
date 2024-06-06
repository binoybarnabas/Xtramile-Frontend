import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { blob, filter } from 'd3';
import { CustomLoaderService } from 'src/app/services/helperServices/commonUIServices/custom-loader-service/custom-loader.service';
@Component({
  selector: 'app-tabbed-data-table',
  templateUrl: './tabbed-data-table.component.html',
  styleUrls: ['./tabbed-data-table.component.css']
})


export class TabbedDataTableComponent {

@Input() tabs: any[] = [];
@Input() filters: any[] = [];
@Input() isSearchFilterNeeded: string;
@Input() hasMultipleTabs: boolean = true;
// @Input() totalItems!: number

@Output() filterToggled: EventEmitter<any> = new EventEmitter<any>();
@Output() search: EventEmitter<any> = new EventEmitter<any>();
@Output() rowClick: EventEmitter<[string, any]> = new EventEmitter();
@Output() tabChange: EventEmitter<any> = new EventEmitter<any>();
@Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


activeTabIndex: number = 0; // Initially set to show the first tab
searchInputValue: string = ''
// itemsPerPage: number = 10;
// totalPages: number = 0

constructor(private http: HttpClient, private loaderService : CustomLoaderService){
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

onSearch(){
  this.search.emit(this.searchInputValue);
}

onDownloadFileClick(url: string, docType: string, employeeName: string){

    this.loaderService.show();

      const header = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store',
      'Expires': '0'    
    })
  this.http.get(url, {responseType: 'blob', headers: header}).subscribe({
    next: (data: Blob) =>{

      this.loaderService.hide();

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

onRowClick(heading: any, row:any){
  this.rowClick.emit([heading, row]);
}

onTabChange(index: number){
  this.activeTabIndex = index;
  this.tabChange.emit(this.activeTabIndex);
}

// ngDoCheck(){
//   this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
// }

// getPageNumbers(): number[] {
//   return Array(this.totalPages).fill(0).map((x, i) => i + 1);
// }

// onPageChange(currentPage: number){
//   console.log("tabbed data table page = " , currentPage)
//   this.pageChange.emit(currentPage)
// }

}
