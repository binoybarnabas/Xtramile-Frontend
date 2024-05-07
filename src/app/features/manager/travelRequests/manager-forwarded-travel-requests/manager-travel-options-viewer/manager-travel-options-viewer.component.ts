import { Component } from '@angular/core';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { CustomToastService } from 'src/app/services/toastServices/custom-toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/services/interfaces/iuserData';
import { TravelOptionDetails } from 'src/app/services/interfaces/iTravelOptionDetails';
@Component({
  selector: 'app-manager-travel-options-viewer',
  templateUrl: './manager-travel-options-viewer.component.html',
  styleUrls: ['./manager-travel-options-viewer.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('300ms ease-out'))
    ])
  ]
})
export class ManagerTravelOptionsViewerComponent {
requestId!:number;
descriptions!: any[];
receveingOptionId !:number;
empId:number=1;
userData: UserData;
IsSelectedPage: boolean = false;
 //For change status button of rm.
 name_rm: string = 'Submit'
 primaryStatusCode_rm: string = 'PE'
 secondaryStatusCode_rm: string = 'SD'

 //For change status button of ta.
 name_ta:string = "Confirm"
 primaryStatusCode_ta:string = "OG"
 secondaryStatusCode_ta:string = "OG"
 
constructor(private managerService:ManagerTravelRequestsService, private sanitizer: DomSanitizer,private requestService: RequestService,private toastService: CustomToastService,private activatedRoute:ActivatedRoute ,private router: Router){
  const storedUserData = localStorage.getItem('userData');
  this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;
  this.empId = this.userData?.empId
}
ngOnInit(){
  this.activatedRoute.queryParamMap.subscribe((query) => {
    if (query.get('requestId')) {
      this.requestId = parseInt(query.get('requestId')!, 10)
      console.log(this.requestId)
      this.IsSelectedPage = query.get('IsSelectedPage') === 'true';
      console.log(this.IsSelectedPage)
    }
  })
  
  this.getTravelOptionsByReqId(this.requestId);
  this.getAvailableOptionsDescription();
  this.getSelectedOption(); 
  this.requestService.patchImageEvent$.subscribe({
    next:()=>{
      this.getSelectedOption();
    }
  })
}

getAvailableOptionsDescription(){
  this.managerService.getAvailableOptionsDescription(this.requestId).subscribe({
    next: (response: any) =>{
      this.descriptions = response.map((item: { htmlString: SafeHtml; description: string; expanded:boolean; clicked:boolean }) => {
        item.htmlString = this.sanitizer.bypassSecurityTrustHtml(item.description);
        item.expanded = false;
        item.clicked = false; 
        return item;
      });
      this.sortDescriptions();
    },
    error: (error: any) => {
      console.error('Post failed:', error);
    },
    complete: () => {
      console.log('get method completed.');
      console.log(this.descriptions);
    }
 })
}

getSelectedOption(){
   this.requestService.selectedOptionFromEmployee(this.requestId).subscribe({
    next: (data) =>{
    this.receveingOptionId = data
    console.log(this.receveingOptionId);
    this.sortDescriptions();
    this.selectedOption();
  },
  error: (error: any) => {
    console.error('Post failed:', error);
  },
  complete: () => {
    console.log('Post request completed.');
  }

  })
}

selectedOptionId!:number;
togglePanel(item: any): void {
  console.log(item)
  this.descriptions.forEach(panel => panel.clicked = false);
  item.expanded = !item.expanded;
  item.clicked = !item.clicked; 
  this.selectedOptionId = item.optionId;
  console.log(this.selectedOptionId)
}

confirmOption(): void {  
  console.log('Option confirmed:', this.selectedOptionId);
  this.requestService.submitSelectedOption(this.requestId, this.empId, this.selectedOptionId).subscribe({
    next: (response: any) => {
      console.log('Post successful:', response);
      this.getAvailableOptionsDescription();
    },
    error: (error: any) => {
      console.error('Post failed:', error);
    },
    complete: () => {
      console.log('Post request completed.');
      this.router.navigate(['manager/dashboard']);
      this.toastService.showToast("Travel Option Selected!");
    }
  });
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
resetSelection(){
  this.descriptions.forEach(panel => panel.clicked = false);
}
displayConfirmBtn(): boolean {
  return this.descriptions.some(description => description.optionId === this.receveingOptionId);
}

editable:boolean = false;
editOption(){
  this.editable = !this.editable;
}
cancelEdit(){
  this.descriptions.forEach(panel => panel.clicked = false);
  this.editable = false;
}
updateOption(){
  const updatedOption = {
    requestId:this.requestId,
    empId:this.empId,
    optionId: this.selectedOptionId
  }
  this.requestService.updateSelectedOption(updatedOption).subscribe({
    next: (response:string)=>{
      this.getSelectedOption();
      this.requestService.triggerTextPatchEvent();
    },
    error: (error:any)=>{
      console.log('Update operation is failed')
    },
    complete:()=>{
      this.toastService.showToast("Option has been updated");
      this.editable = false;
    }
  })
}
navigateToTAOngoing(){
  this.toastService.showToast("Request is Ongoing");
  this.router.navigate(['traveladmin/approved_requests']);
}
disableUpdateBtn(): boolean {
  const isAnyItemClicked = this.descriptions.some(item => item.clicked);
  return !isAnyItemClicked;
}
sortDescriptions(): void {
  if (this.receveingOptionId) {
    const selectedIndex = this.descriptions.findIndex(item => item.optionId === this.receveingOptionId);
    if (selectedIndex !== -1) {
      const selectedOption = this.descriptions.splice(selectedIndex, 1)[0];
      this.descriptions.unshift(selectedOption);
    }
  }
}

travelOptionsData: TravelOptionDetails[] = [];

getTravelOptionsByReqId(reqId: number) {

  this.requestService.getTravelOptionsByReqId(reqId).subscribe({
    next: (data) => {
      this.travelOptionsData = data;
      console.log(this.travelOptionsData)
      // data.forEach((option: { optionId: number; }) => {
      //   this.travelOptionId.push(option.optionId);
      // })
    },
    error: (error: Error) => {
      console.log("Error has occurred, " + error.message);
    },
    complete: () => {
      console.log("Completed");
    }
  });
}

selectedOption(): boolean {
  return this.descriptions.some((item: { optionId: number; }) => item.optionId === this.receveingOptionId);
}

}

