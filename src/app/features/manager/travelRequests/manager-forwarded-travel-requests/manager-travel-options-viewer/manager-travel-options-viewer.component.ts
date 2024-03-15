import { Component } from '@angular/core';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { CustomToastService } from 'src/app/services/toastServices/custom-toast.service';
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
requestId:number = 5
descriptions!: any[];

constructor(private managerService:ManagerTravelRequestsService, private sanitizer: DomSanitizer,private requestService: RequestService,private toastService: CustomToastService){
}
ngOnInit(){
  this.getAvailableOptionsDescription();
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
togglePanel(item: any): void {
  item.expanded = !item.expanded;
}
//
empId:number=1;
confirmOption(optionId:any): void {  
  console.log('Option confirmed:', optionId);
  this.requestService.submitSelectedOption(this.requestId, this.empId, optionId).subscribe({
    next: (response: any) => {
      console.log('Post successful:', response);
    },
    error: (error: any) => {
      console.error('Post failed:', error);
    },
    complete: () => {
      console.log('Post request completed.');
      this.toastService.showToast("Travel Option Selected!");
      // alert("Submitted!")
    }
  });
}
}
