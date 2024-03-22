import { Component } from '@angular/core';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { CustomToastService } from 'src/app/services/toastServices/custom-toast.service';
import { ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/services/interfaces/iuserData';
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

 //For change status button of rm.
 name_rm: string = 'Submit'
 primaryStatusCode_rm: string = 'PE'
 secondaryStatusCode_rm: string = 'SD'

 //For change status button of ta.
 name_ta:string = "Confirm"
 primaryStatusCode_ta:string = "FD"
 secondaryStatusCode_ta:string = "FD"
 
constructor(private managerService:ManagerTravelRequestsService, private sanitizer: DomSanitizer,private requestService: RequestService,private toastService: CustomToastService,private activatedRoute:ActivatedRoute ){
  const storedUserData = localStorage.getItem('userData');
  this.userData = storedUserData !== null ? JSON.parse(storedUserData) : null;
  this.empId = this.userData?.empId
}
ngOnInit(){
  this.activatedRoute.queryParamMap.subscribe((query) => {
    if (query.get('requestId')) {
      this.requestId = parseInt(query.get('requestId')!, 10)
      console.log(this.requestId)
    }
  })
  
  this.getAvailableOptionsDescription();
  this.getSelectedOption(); 
}

getAvailableOptionsDescription(){
  this.managerService.getAvailableOptionsDescription(this.requestId).subscribe({
    next: (response: any) =>{
      this.descriptions = response.map((item: { htmlString: SafeHtml; description: string; expanded:boolean }) => {
        item.htmlString = this.sanitizer.bypassSecurityTrustHtml(item.description);
        item.expanded = false;
        return item;
      });
      console.log('get method is successful');
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
    console.log(this.receveingOptionId)
  },
  error: (error: any) => {
    console.error('Post failed:', error);
  },
  complete: () => {
    console.log('Post request completed.');
  }

  })
}

togglePanel(item: any): void {
  console.log(item)
  item.expanded = !item.expanded;
}

confirmOption(optionId:any): void {  
  console.log('Option confirmed:', optionId);
  this.requestService.submitSelectedOption(this.requestId, this.empId, optionId).subscribe({
    next: (response: any) => {
      console.log('Post successful:', response);
      this.getAvailableOptionsDescription();
    },
    error: (error: any) => {
      console.error('Post failed:', error);
    },
    complete: () => {
      console.log('Post request completed.');
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
}
