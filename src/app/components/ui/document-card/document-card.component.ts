import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { Subscription } from 'rxjs';

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

  constructor(private commonService: CommonAPIService) { }

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
  
}