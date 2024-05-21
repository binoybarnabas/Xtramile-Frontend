import { Component, Output, EventEmitter, Input } from '@angular/core';

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

  constructor() { }
  
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