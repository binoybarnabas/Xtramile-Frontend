import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { TravelOptionDetails } from 'src/app/services/interfaces/iTravelOptionDetails';
import { UserData } from 'src/app/services/interfaces/iuserData';

@Component({
  selector: 'app-selected-option-travel-admin',
  templateUrl: './selected-option-travel-admin.component.html',
  styleUrls: ['./selected-option-travel-admin.component.css']
})
export class SelectedOptionTravelAdminComponent {
  travelOptionsData: TravelOptionDetails[] = [];
  reqId: number = 0;
  receveingOptionId!:number
  travelOptionId: number[] = [];
  userData: UserData
  empId: number;
  name:string = "Confirm"
  primaryStatusCode:string = "FD"
  secondaryStatusCode:string = "FD"

  
  constructor(private requestService: RequestService, private activatedRoute: ActivatedRoute){
    const storedUserData = localStorage.getItem('userData');
    this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;
    this.empId = this.userData?.empId
  }


  ngOnInit() {
    //1
    this.activatedRoute.queryParamMap.subscribe((query) => {
      if (query.get('requestId')) {
        this.reqId = parseInt(query.get('requestId')!, 10)
      }
    })
  //2
    this.requestService.selectedOptionFromEmployee(this.reqId).subscribe({
      next: (data) =>{
      this.receveingOptionId = data
      console.log(data)
    },
    error: (error: any) => {
      console.error('Post failed:', error);
    },
    complete: () => {
      console.log('Post request completed.');
    }

    })
  //3
    this.requestService.getTravelOptionsByReqId(this.reqId).subscribe({
      next: (data) => {
      this.travelOptionsData = data;
      console.log(this.travelOptionsData)
      data.forEach((option: { optionId: number; }) => {
        this.travelOptionId.push(option.optionId);
      })

      },
      error: (error: Error) => {
        console.log("Error has occurred, " + error.message);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }
}