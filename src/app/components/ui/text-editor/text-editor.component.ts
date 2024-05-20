import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';
import { ModalComponent } from '../modal/modal.component';
import { CustomToastService } from 'src/app/services/helperServices/toastServices/custom-toast.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent {
  htmlContent: string = ''; 
  requestId:number =1;
  optionId:number =1;
  constructor(public bsModalRef: BsModalRef,private apiService:TravelAdminTravelRequestsService,private modalService: BsModalService,private toastService: CustomToastService){
    
  }
  UploadFile(){}

  closeModal(){
    this.bsModalRef.hide(); 
  }
  // saveTravelOption() {
  //   this.apiService.saveTravelOption(this.htmlContent, this.requestId)
  //     .subscribe({
  //       next: (response: any) => {
  //         console.log('Post successful:', response);
  //         this.closeModal();
  //       },
  //       error: (error: any) => {
  //         console.error('Post failed:', error);
  //       },
  //       complete: () => {
  //         this.toastService.showToast("Travel Option Added!")
  //         console.log('Post request completed.');
  //       }
  // });
  // }
  // openAddOptionModal() {
  //   this.bsModalRef = this.modalService.show(ModalComponent);
  //   this.bsModalRef.content.onClose.subscribe((result: any) => {
  //     // Handle the result from the modal if needed
  //     console.log('Modal result:', result);
  //   });
  // }
  @Input()
  textOptions!: Function;
  selectTextOptions(): void {
    const textOption: string = this.htmlContent;
  
    if (this.textOptions) {
      this.textOptions(textOption); // Calling the callback function
    }
  
    this.closeModal();
  }
}
