import { Component, Input } from '@angular/core';
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

  IsSelectedPage: boolean = false;
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
        console.log(this.reqId);
        this.IsSelectedPage = query.get('IsSelectedPage') === 'true';
        console.log(this.IsSelectedPage)
      }
    })
    this.getTravelOptionsByReqId(this.reqId)

     //2
    this.selectedOptionFromManager();

    //subject subscription
    this.requestService.patchTextEvent$.subscribe({
      next:()=>{
        this.selectedOptionFromManager();
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
    console.log(this.selectedOptionId);
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
          this.router.navigate(['/manager/dashboard']);
          this.toastService.showToast({ message: "Travel Option Selected", toastType: "success", toastDuration: 3000 });
        },
        error: (error: any) => {
          console.error('Post failed:', error);
        },
        complete: () => {
          console.log('Post request completed.');
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

  resetSelection() {
    this.selectedOption = null;
  }

  onTravelAdminConfirm(){
    this.toastService.showToast({ message: "Travel Option Confirmed", toastType: "success", toastDuration: 3000 });
    this.router.navigate(['/traveladmin/approved_requests']);
  }
  shouldDisplayButton(): boolean {
    return this.travelOptionId.some(id => id === this.receveingOptionId);
  }
  editable:boolean = false;
  editOption(){
    this.editable = !this.editable;
  }

  updateOption(){
    const updatedOption = {
      requestId:this.reqId,
      empId:this.empId,
      optionId: this.selectedOptionId
    }
    this.requestService.updateSelectedOption(updatedOption).subscribe({
      next:(data) =>{
        this.selectedOptionFromManager();
        this.requestService.triggerImagePatchEvent();
      },
      error:(error:Error)=>{
        console.log('Error occured while updating option');
      },
      complete:() =>{
        console.log('Option has been updated');
        this.toastService.showToast({ message: "Travel Option Send", toastType: "success", toastDuration: 3000 });
        this.editable = false;
        this.selectedOption = null;
      }
    })
  }

  selectedOptionFromManager(){
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
      if(this.receveingOptionId == null){
        this.hideDiv= false;
      }
    }
    })
  }
  cancelEdit(){
    this.editable = false;
    this.selectedOption = null;
  }

  disableUpdateBtn(): boolean {
    if(this.selectedOption == null){
      return true
    }
    return false;
  }

  navigateToTAOngoing(){
    this.toastService.showToast({ message: "Travel Request Ongoing", toastType: "success", toastDuration: 3000 });
    this.router.navigate(['traveladmin/approved_requests']);
  }
}
