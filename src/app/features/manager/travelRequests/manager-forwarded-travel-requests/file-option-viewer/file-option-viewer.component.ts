import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { TravelOptionDetails } from 'src/app/services/interfaces/iTravelOptionDetails';
import { UserData } from 'src/app/services/interfaces/iuserData';
import { CustomToastService } from 'src/app/services/toastServices/custom-toast.service';

@Component({
  selector: 'app-file-option-viewer',
  templateUrl: './file-option-viewer.component.html',
  styleUrls: ['./file-option-viewer.component.css']
})
export class FileOptionViewerComponent {
  travelOptionsData: TravelOptionDetails[] = [];

  reqId!: number;

  selectedOption: any;
  selectedOptionId: any;

  travelOptionId: number[] = [];

  empId: number;
  userData: UserData
  receveingOptionId!:number

  //For change status button of rm.
  name_rm: string = 'Submit'
  primaryStatusCode_rm: string = 'PE'
  secondaryStatusCode_rm: string = 'SD'
 

  //For change status button of ta.
  name_ta:string = "Confirm"
  primaryStatusCode_ta:string = "OG"
  secondaryStatusCode_ta:string = "OG"

  hideDiv:boolean = true;
  constructor(private requestService: RequestService, private activatedRoute: ActivatedRoute, private router: Router, private toastService: CustomToastService
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
        console.log(this.reqId)
      }
    })
    this.getTravelOptionsByReqId(this.reqId)
    // this.getTravelOptionsByReqId(96)

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

    
  }

  //Get Travel Options By Req Id
  getTravelOptionsByReqId(reqId: number) {

    this.requestService.getTravelOptionsByReqId(reqId).subscribe({
      next: (data) => {
        this.travelOptionsData = data;
        console.log(this.travelOptionsData)
        data.forEach((option: { optionId: number; }) => {
          this.travelOptionId.push(option.optionId);
        })

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
          // alert("Option Submitted!")
          //Change Alert to PopUp
          // Reset the selectedOption after a successful post
          this.selectedOption = null;
          this.getTravelOptionsByReqId(this.reqId)
        },
        error: (error: any) => {
          console.error('Post failed:', error);
        },
        complete: () => {
          console.log('Post request completed.');
          this.router.navigate(['manager/dashboard']);
          this.toastService.showToast("Travel Option Selected!");
          // alert("Submitted!")
        }
      });
    }
  }

  buttonActivate: boolean = this.checkRoleOfUser();
  checkRoleOfUser(): boolean {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userDataParsed = JSON.parse(userData);

      if (userDataParsed.role === 'Manager' && userDataParsed.department === 'TA') {
        return false;
      } else {
        return true;
      }
    }
    // Return a default value if userData is falsy
    return false;
  }
 
  checkCurrentUrl() {
    const currentUrl = this.router.url;
    console.log(currentUrl);
    if (currentUrl === "/traveladmin/waiting") {
      // Hide the div
      this.hideDiv = false; 
    } else {
      // Show the div
      this.hideDiv = true;
    }
  }

  resetSelection() {
    this.selectedOption = null;
  }

  onTravelAdminConfirm(){
    this.toastService.showToast("Confirmation sent successfully.")
    this.router.navigate(['/traveladmin/approved_requests']);
  }
}
