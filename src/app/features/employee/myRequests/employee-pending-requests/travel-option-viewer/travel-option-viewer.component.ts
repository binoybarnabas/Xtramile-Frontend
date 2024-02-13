import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { TravelOptionDetails } from 'src/app/services/interfaces/iTravelOptionDetails';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-travel-option-viewer',
  templateUrl: './travel-option-viewer.component.html',
  styleUrls: ['./travel-option-viewer.component.css']
})
export class TravelOptionViewerComponent {

  travelOptionsData: TravelOptionDetails[] = [];

  reqId: number = 0;

  selectedOption: any;
  selectedOptionId: any;

  constructor(private requestService: RequestService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    //sus
    this.activatedRoute.queryParamMap.subscribe((query) => {
      if (query.get('requestId')) {
        this.reqId = parseInt(query.get('requestId')!, 10)
      }
    })
    // this.getTravelOptionsByReqId(this.reqId)
    this.getTravelOptionsByReqId(96)

  }

  //Get Travel Options By Req Id
  getTravelOptionsByReqId(reqId: number) {

    this.requestService.getTravelOptionsByReqId(reqId).subscribe({
      next: (data) => {

        this.travelOptionsData = data;
        console.log(this.travelOptionsData)

      },
      error: (error: Error) => {
        console.log("Error has occurred, " + error.message);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }


  selectOption(option: any): void {
    this.selectedOption = option;
    this.selectedOptionId = option.optionId;
  }




}
