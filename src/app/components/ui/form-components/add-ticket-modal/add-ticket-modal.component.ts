import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonAPIService } from 'src/app/services/apiServices/commonAPIServices/common-api.service';
import { CustomToastService } from 'src/app/services/helperServices/toastServices/custom-toast.service';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-add-ticket-modal',
  templateUrl: './add-ticket-modal.component.html',
  styleUrls: ['./add-ticket-modal.component.css']
})
export class AddTicketModalComponent {

  //@Output() travelOptionAdded: EventEmitter<void> = new EventEmitter<void>();
  private _requestId!: number;

  @Input() tripType !: string;

  @Input()
  set requestId(value: number) {

    this._requestId = value;
    console.log(this._requestId)
    if (this.travelTicketForm) {
      this.travelTicketForm.get('requestId')?.setValue(value);
    }
  }


  travelTicketForm!: FormGroup;

  isFileSelected : boolean = false;
  isSubmitBtnClicked : boolean = false;

  constructor(public bsModalRef: BsModalRef, 

    private toastService: CustomToastService) {

  }

  uploadFormTitle : string = 'Upload Ticket File'

  ngOnInit() {

    this.travelTicketForm = new FormGroup({

      ticketFile: new FormControl(Validators.required),
      requestId: new FormControl(this._requestId, Validators.nullValidator),
      description: new FormControl('', Validators.nullValidator)

    });

    //this.commonService.setIsFile(false);
  }

  closeModal() {
    this.bsModalRef.hide();
  }


  imageValidator(control: FormControl) {
    const value = control.value;
    if (typeof value === 'string' && value.startsWith('data:image/')) {
      return null; // Valid
    }
    return { invalidImage: true }; // Invalid
  }


  selectedFiles: File[] = [];
  onFileChange(event: any): void {
    const files = event.target.files;
    this.selectedFiles = [];
  
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
      this.isFileSelected = true;
    }
  }


  @Input()
  onTicketFileSelected!: Function;

  addImageFile(): void {

    this.isSubmitBtnClicked = true;

    if(this.selectedFiles.length === 0){
      this.isFileSelected = false;
      // this.toastService.showToast({
      //   message: 'No Files Selected',
      //   toastType: 'warning',
      //   toastDuration: 3000,
      // });
      return;
    }

    const tickets: File[] = this.selectedFiles;
    const descriptions: string[] = this.travelTicketForm.get('description')?.value;
  
    if (this.onTicketFileSelected) {
      this.onTicketFileSelected(tickets, descriptions); // Calling the callback function
    }
  
    this.closeModal();
  }


}
