import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent {
  htmlContent: string = ''; // Variable to store the content of the editor
  requestId:number =1;
  optionId:number =1;
  constructor(public bsModalRef: BsModalRef,private apiService:TravelAdminTravelRequestsService,private modalService: BsModalService){
    
  }
  UploadFile(){}

  closeModal(){
    this.bsModalRef.hide(); 
  }
  saveTravelOption() {
    
    console.log(this.htmlContent);
    this.apiService.saveTravelOption(this.htmlContent, this.requestId)
      .subscribe({
        next: (response: any) => {
          console.log('Post successful:', response);
          // Reset the selectedOption after a successful post
        },
        error: (error: any) => {
          console.error('Post failed:', error);
        },
        complete: () => {
          console.log('Post request completed.');
        }
  });
  }
  openAddOptionModal() {
    // const initialState = {
    //   requestId: this.travelRequestDetailViewModel.requestId
    // };

    // this.getTravelOptionsByReqId(this.travelRequestDetailViewModel.requestId)


    this.bsModalRef = this.modalService.show(ModalComponent);
    this.bsModalRef.content.onClose.subscribe((result: any) => {
      // Handle the result from the modal if needed
      console.log('Modal result:', result);


      // You can perform actions with the result data here
    });
  }
}
