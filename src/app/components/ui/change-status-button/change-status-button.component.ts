import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { RequestStatus } from './request-status';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';

@Component({
  selector: 'app-change-status-button',
  templateUrl: './change-status-button.component.html',
  styleUrls: ['./change-status-button.component.css']
})
export class ChangeStatusButtonComponent {
  constructor(private commonApiService : CommonAPIService) {}

  @Input() name: string = '';
  @Input() empId: number = 0;
  @Input() requestId: number = 0;
  @Input() primaryStatusCode: string = '';
  @Input() secondaryStatusCode: string = '';
  @Output() externalpostTriggered = new EventEmitter<void>();

  private subscription : Subscription | any

  statusId : number = 0

  requestStatus : RequestStatus = {
    requestId: 0,
    empId: 0,
    primaryStatusId: 0,
    date: new Date(),
    secondaryStatusId: 0
  }


  getStatusIdByCode(statusCode: string) {
    return this.commonApiService.getStatusIdByCode(statusCode);
  }

  async updateRequestStatus() {

    if(this.externalpostTriggered)
    this.externalpostTriggered.emit()
  
    this.requestStatus.requestId = this.requestId
    this.requestStatus.empId = this.empId;
    //await and firstValueFrom are used to first get the id from the asynchronous function
    //getStatusIdByCode and then execute the remaining code
    this.statusId = await firstValueFrom(this.getStatusIdByCode(this.primaryStatusCode));
    this.requestStatus.primaryStatusId = this.statusId;
    console.log("primaryStatusId : " + this.requestStatus.primaryStatusId);
    this.requestStatus.date = new Date();  
    this.statusId = await firstValueFrom(this.getStatusIdByCode(this.secondaryStatusCode));
    this.requestStatus.secondaryStatusId = this.statusId;
    console.log("secondaryStatusId : " + this.requestStatus.secondaryStatusId); 

    this.subscription = this.commonApiService.updateRequestStatus(this.requestStatus).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error: Error) => {
        console.log("Error in posting request status");
        console.log(error.message);
      },
      complete: () => {
        console.log("Posting Request Status Complete");
      }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
