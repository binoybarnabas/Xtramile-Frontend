import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-rejection-card',
  templateUrl: './rejection-card.component.html',
  styleUrls: ['./rejection-card.component.css']
})
export class RejectionCardComponent {
 message: string='';
 requestId:number=0;
 employeeId:number=0;

  constructor(public bsModalRef: BsModalRef,private router: Router) {}

  resubmitForm() {
    const queryParams = { requestId: this.requestId }

   this.router.navigate(['employee/request'], { queryParams: queryParams });

    this.closeModal();
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
