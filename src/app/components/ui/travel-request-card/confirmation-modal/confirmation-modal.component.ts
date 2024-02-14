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
    window.location.reload(); // This line will refresh the page
  }

  cancel(): void {
    this.bsModalRef.hide();
    this.confirmed.emit(false);
  }
  
}
