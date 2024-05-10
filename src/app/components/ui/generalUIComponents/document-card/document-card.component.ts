import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.css']
})
export class DocumentCardComponent{

  @Input() travellerDocuments: any;

  selectedDocCardId : number = -1;

  @Output() openInPdfViewer = new EventEmitter<string>();
  @Output() updateSelectedDocCardId = new EventEmitter<number>();

  constructor(private commonService: CommonAPIService,private http: HttpClient) { }
  
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