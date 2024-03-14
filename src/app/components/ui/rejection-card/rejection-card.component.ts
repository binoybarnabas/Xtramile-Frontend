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
    alert('Resubmit form');
    const queryParams = { requestId: this.requestId }

   this.router.navigate(['employee/request'], { queryParams: queryParams });

    this.closeModal();
    //to update the status as open denied after resubmitting
    // this.apiservice.resubmitRequestStatus(this.requestId,this.employeeId).subscribe(
    //   {
    //     next: () => {
    //       console.log('sucessfully set the status');

    //     },
    //     complete: () => {
    //       console.log("Resubmit Request")
    //     }
    //   })
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
