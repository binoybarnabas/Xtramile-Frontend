import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { TravelOptionDetails } from 'src/app/services/interfaces/iTravelOptionDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/services/interfaces/iuserData';

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

  travelOptionId: number[] = [];

  empId: number;
  userData: UserData

  name: string = 'Submit'
  primaryStatusCode: string = 'SD'
  secondaryStatusCode: string = 'SD'

  constructor(private requestService: RequestService, private activatedRoute: ActivatedRoute, private router: Router,
  ) {
    const storedUserData = localStorage.getItem('userData');
    this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;
    this.empId = this.userData?.empId
  }

  ngOnInit() {

    //sus
    this.activatedRoute.queryParamMap.subscribe((query) => {
      if (query.get('requestId')) {
        this.reqId = parseInt(query.get('requestId')!, 10)
      }
    })
    this.getTravelOptionsByReqId(this.reqId)
    // this.getTravelOptionsByReqId(96)

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
    // alert(this.selectedOptionId);
    this.selectedOption = option;
    this.selectedOptionId = option.optionId;
  }


  //To handle the selected option and perform the POST request
  postSelection(): void {

    //  alert("Employee Submitted!" + this.selectedOptionId);

    if (this.selectedOptionId) {

      // alert(this.selectedOptionId);

      this.requestService.submitSelectedOption(this.reqId, this.empId, this.selectedOptionId).subscribe({
        next: (response: any) => {
          console.log('Post successful:', response);
          alert("Option Submitted!")
          //Change Alert to PopUp
          // Reset the selectedOption after a successful post
          this.selectedOption = null;
        },
        error: (error: any) => {
          console.error('Post failed:', error);
        },
        complete: () => {
          console.log('Post request completed.');
          this.router.navigate(['employee/pending']);

          // alert("Submitted!")
        }
      });
    }
  }

  buttonActivate: boolean = this.checkRoleOfUser();
  checkRoleOfUser(): boolean {
    const userData = localStorage.getItem('userData');
    if(userData){
        const userDataParsed = JSON.parse(userData);
 
        if(userDataParsed.role === 'Manager' &&  userDataParsed.department === 'TA'){
            return false;
        } else {
            return true;
        }
    }
    // Return a default value if userData is falsy
    return false;
}
}
