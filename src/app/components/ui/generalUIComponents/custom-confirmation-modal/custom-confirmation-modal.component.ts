import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-custom-confirmation-modal',
  templateUrl: './custom-confirmation-modal.component.html',
  styleUrls: ['./custom-confirmation-modal.component.css']
})
export class CustomConfirmationModalComponent {
  
  @Input() mainText : string = 'Main';
  @Input() description: string = 'description';
  @Input() cancelBtnText : string = 'Cancel';
  @Input() confirmBtnText : string = 'Confirm';
  @Input() confirmBtnColor : string = '#9a4cfa';

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  constructor(public bsModalRef: BsModalRef){
    
  }

  onCancelBtnClick(){
    this.cancel.emit();
    this.bsModalRef.hide();
  }

  onCloseIconClick(){
    this.bsModalRef.hide();
  }

  onConfirmBtnClick(){
    this.confirm.emit();
    this.onCloseIconClick();
  }

  
}
