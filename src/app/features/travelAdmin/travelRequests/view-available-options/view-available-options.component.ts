import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { AvailableOptions } from '../../../../services/interfaces/iavailable-options';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-view-available-options',
  templateUrl: './view-available-options.component.html',
  styleUrls: ['./view-available-options.component.css']
})
export class ViewAvailableOptionsComponent {

  private subscription: Subscription | any
  constructor(private apiservice: RequestService, private activatedRoute : ActivatedRoute,
    private travelAdminTravelRequestService: TravelAdminTravelRequestsService) {}

  optionsData: AvailableOptions[] = []
  selectedOption: AvailableOptions[] = []

  requestId: number = 0 

  ngOnInit(){
    this.activatedRoute.queryParamMap.subscribe((query) => {
      if(query.get('requestId')){
        this.requestId = parseInt(query.get('requestId')!,10);
        console.log(this.requestId)
        this.fetchOptionsData(this.requestId);
        this.getSelectedOption(this.requestId)
      }
    })
  }

  fetchOptionsData(requestId: number) {
    this.subscription = this.apiservice.getDataFromAvailOptions(requestId).subscribe({
      next: (data) => {
        this.optionsData = data;
        console.log(this.optionsData)
      },
      error: (error: Error) => {
        console.log("Error while fetching options data");
        console.log(error.message);
      },
      complete: () => {
        console.log("Fetching Options Complete");
      }
    });
  }

  getSelectedOption(requestId: number){
    this.subscription = this.travelAdminTravelRequestService.getSelectedOption(requestId).subscribe({
      next: (data) => {
        this.selectedOption.push(data)
        console.log(this.selectedOption)
      },
      error: (error: Error) => {
        console.log("Error while fetching selected options data");
        console.log(error.message);
      },
      complete: () => {
        console.log("Fetching Options Complete");
      }      
    })
  }

}