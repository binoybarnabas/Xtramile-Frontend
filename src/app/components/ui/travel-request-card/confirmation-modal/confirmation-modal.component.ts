import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {

  confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(public bsModalRef: BsModalRef) { }

  confirm(): void {
    this.bsModalRef.hide();
    this.confirmed.emit(true);

    //sus - Page Reloading May Trigger ALL API Calls if not handled properly
    window.location.reload(); // This line will refresh the page - sus
    //replace with another method call which loads only the necessary data 

  }

  cancel(): void {
    this.bsModalRef.hide();
    this.confirmed.emit(false);
  }
  
}
