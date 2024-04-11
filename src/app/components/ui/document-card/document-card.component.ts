import { Component, OnInit, OnDestroy } from '@angular/core';
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

  flipCard(card: any) {
    this.isFlipping = true;
    card.isFlipped = !card.isFlipped;
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
  onDeleteDocument(fileId: number): void {
    this.commonService.deleteEmployeeDetails(fileId).subscribe(
      () => {
        this.commonService.setIsFile(true) 
        console.log('is set fiel',true)
        console.log(`Document with ID ${fileId} deleted successfully.`);
      },
      (error: any) => {
        console.error(`Error deleting document with ID ${fileId}:`, error);
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
}