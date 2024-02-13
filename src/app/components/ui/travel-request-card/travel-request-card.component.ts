import { Component, Input } from '@angular/core';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';

@Component({
  selector: 'app-travel-request-card',
  templateUrl: './travel-request-card.component.html',
  styleUrls: ['./travel-request-card.component.css']
})
export class TravelRequestCardComponent {

  @Input() data: any[] = []

  statusChangeUser! : string
  currentLoggedInUserRole: string;

  constructor(private commonAPIService: CommonAPIService,private requestService:RequestService) {
    this.currentLoggedInUserRole = commonAPIService.currentLoggedInUserRole;
  }


  cancelRequest(requestId:number){
    console.log(this.currentLoggedInUserRole);
    if(this.currentLoggedInUserRole === 'employee'){
      this.requestService.employeeCancelRequest(requestId).subscribe({
        next:(data)=>{
          console.log(data)
        console.log("success");
        },
        error:(error:Error)=>{
          console.log(error)
        },
        complete:()=>{
          console.log("done");
        }
      });
    }
    else if(this.currentLoggedInUserRole == 'manager'){

    }
  }


}
