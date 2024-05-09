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
  @Input() primaryStatusId: number = 0;
  @Input() secondaryStatusId: number = 0;
  @Output() externalpostTriggered = new EventEmitter<void>();
  @Input() disabled:boolean =false;
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

    this.requestStatus.requestId = this.requestId
    this.requestStatus.empId = this.empId;
    this.requestStatus.primaryStatusId = this.primaryStatusId;
    this.requestStatus.date = new Date();  
    this.requestStatus.secondaryStatusId = this.secondaryStatusId

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
        if(this.externalpostTriggered){
          this.externalpostTriggered.emit()
        }
      }
    });
  }
}
