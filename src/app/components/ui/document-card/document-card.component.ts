import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.css']
})
export class DocumentCardComponent implements OnDestroy {
  employeeId: number = 0;
  employeeDocuments: any;
  pollingInterval: number = 3000; 
  pollingSubscription!: Subscription;

  constructor(private commonService: CommonAPIService, private http: HttpClient) { }

  ngOnInit() {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData')!);
      this.employeeId = userData.empId;
    }
    this.pollingSubscription = interval(this.pollingInterval).subscribe(() => {
      this.getDocuments();
    });
  }

  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  flipCard(card: any) {
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
}
