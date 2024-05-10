import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.css']
})
export class DocumentCardComponent implements OnInit, OnDestroy {

  employeeId: number = 0;
  employeeDocuments: any;
  pollingInterval: number = 1000;
  isFlipping: boolean = false;
  private isFileSubscription!: Subscription;

  selectedDocCardId : number = -1;

  @Output() openInPdfViewer = new EventEmitter<string>();
  @Output() updateSelectedDocCardId = new EventEmitter<number>();

  constructor(private commonService: CommonAPIService,private http: HttpClient) { }

  ngOnInit() {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData')!);
      this.employeeId = userData.empId;
    }
    this.getDocuments();
    this.isFileSubscription = this.commonService.isFile$.subscribe(isFile => {
      if (isFile) {
        this.getDocuments();
      }
    });
  }

  ngOnDestroy() {
    this.isFileSubscription.unsubscribe();
  }


  getDocuments() {
    this.commonService.getEmployeeDocuments(this.employeeId).subscribe(
      (data) => {
        this.employeeDocuments = data;
        console.log('Fetched documents:', data);
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  
  onDownloadFileClick(url: string, docType: string){
    this.http.get(url, {responseType: 'blob'}).subscribe({
      next: (data: Blob) =>{
        const blob = new Blob([data], {type: data.type});
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${docType}`;
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

  onDocCardSelected(cardId: number){
    
    if(this.selectedDocCardId === cardId){
      this.selectedDocCardId = -1;
    }
    else{
      this.selectedDocCardId = cardId;
    }

    this.updateSelectedDocCardId.emit(this.selectedDocCardId);

  }

  openPdfViewer(fileUrl: string) {
    this.openInPdfViewer.emit(fileUrl);
  }


}