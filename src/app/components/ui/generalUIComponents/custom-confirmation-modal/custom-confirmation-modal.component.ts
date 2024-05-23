import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-custom-confirmation-modal',
  templateUrl: './custom-confirmation-modal.component.html',
  styleUrls: ['./custom-confirmation-modal.component.css']
})
export class CustomConfirmationModalComponent {

  @Input() requestId : number = -1;
  @Input() mainText : string = 'Main';
  @Input() description: string = 'description';
  @Input() cancelBtnText : string = 'Cancel';
  @Input() confirmBtnText : string = 'Confirm';
  @Input() confirmBtnColor : string = '#9a4cfa';

  @Input() isTextFieldEnabled : boolean = false;
  @Input() textFieldLabel : string = '';
  @Input() textFieldFormControlName : string ='';
  @Input() textFieldPlaceHolder : string ='';

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  @Input()  onRejectionReasonEntered!: Function;
  //to be called to return the entered text input

  textFieldValue: string = '';


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

    if(this.isTextFieldEnabled){
      
      this.onRejectionReasonEntered(this.textFieldValue, this.requestId); // Calling the callback function
      
    }
    else{
      this.confirm.emit();
    }
   
    this.bsModalRef.hide();
  
  }

  
}
