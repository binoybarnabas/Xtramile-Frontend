import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { FileCard } from 'src/app/services/interfaces/iFileCard';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css']
})
export class FileCardComponent {


  fileCard: FileCard[] = [];
  travelAuthDocument!: FileCard
  passportDocument!: FileCard
  visaDocument!: FileCard
  @Input() requestId!: number

  constructor( private documentService: DocumentsService, private http: HttpClient ) {}

  ngOnInit(){
    this.getAllRelevantDocuments();
  }

  getAllRelevantDocuments(){
    this.documentService.getRelevantTravelDocuments(this.requestId).subscribe({
      next: (data) => {
        if(data.travelAuthDocument != null){
          this.travelAuthDocument = {
            fileName: data.travelAuthDocument.filename,
            fileType: "Travel Auth Document",
            fileSize: data.travelAuthDocument.documentSize,
            fileURL: data.travelAuthDocument.documentURL
          };       
          this.fileCard?.push(this.travelAuthDocument);
        }
        if(data.passportDocument != null){
          this.passportDocument = {
            fileName: data.passportDocument.filename,
            fileType: "Passport",
            fileSize: data.passportDocument.documentSize,
            fileURL: data.passportDocument.documentURL
          };        
          this.fileCard?.push(this.passportDocument)
        }
        else{
          this.passportDocument = {
            fileName: "Document not yet uploaded. Ask employee to upload relevant document.",
            fileType: "Passport",
            fileSize: "",
          };        
          this.fileCard?.push(this.passportDocument)          
        }
        if(data.visaDocument != null){
          this.visaDocument = {
            fileName: data.visaDocument.filename,
            fileType: "Visa",
            fileSize: data.visaDocument.documentSize,
            fileURL: data.visaDocument.documentURL    
          }      
          this.fileCard?.push(this.visaDocument)
        }
        else{
          this.visaDocument = {
            fileName: "Document not yet uploaded. Ask employee to upload relevant document.",
            fileType: "Visa",
            fileSize: "",
          };        
          this.fileCard?.push(this.visaDocument)          
        }      },
      error: (error: Error) => {
        console.error(error.message)
      }
    })
  }

  downloadFile(url: string, fileName: string){
    // const header = new HttpHeaders({
    //   'Cache-Control': 'no-cache, no-store',
    //   'Expires': '0'    
    // })
    this.http.get(url, {responseType: 'blob'}).subscribe({
      next: (data: Blob) =>{
        const blob = new Blob([data], {type: data.type});
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
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

}