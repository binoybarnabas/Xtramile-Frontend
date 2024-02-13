import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { TravelRequestDetailViewModel } from 'src/app/services/interfaces/iTravelRequestDetails';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';

@Component({
  selector: 'app-travel-request-card-modal',
  templateUrl: './travel-request-card-modal.component.html',
  styleUrls: ['./travel-request-card-modal.component.css']
})
export class TravelRequestCardModalComponent {
  private _requestId!: number;


  @Input()
  set requestId(value: number) {
    this._requestId = value;
    // console.log(this._requestId)
  }

  travelRequestDetailViewModel!: TravelRequestDetailViewModel

  constructor(public bsModalRef: BsModalRef, private router: Router, private commonApiService: CommonAPIService,
  ) {

  }


  ngOnInit() {

    this.commonApiService.GetTravelRequestById(this._requestId).subscribe({

      next: (data) => {
        this.travelRequestDetailViewModel = data;

      },
      error: (error: Error) => { console.log("problems in fetching data") },
      complete: () => { console.log("get request by id is done") }
    });

  }


  //On Travel Click Proceed Button
  navigateToAddOptions() {
    const queryParams = { requestId: this._requestId }
    this.router.navigate(['traveladmin/requestdetail'], { queryParams: queryParams });
    this.bsModalRef.hide();

  }




}
