import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TravelRequestDetailViewModel } from 'src/app/models/dtoModels/iTravelRequestDetails';
import { CommonAPIService } from 'src/app/services/apiServices/commonAPIServices/common-api.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { TravelRequestUiService } from 'src/app/services/helperServices/requestServices/travel-request-ui.service';

@Component({
  selector: 'app-travel-request-info-card',
  templateUrl: './travel-request-info-card.component.html',
  styleUrls: ['./travel-request-info-card.component.css'],
})
export class TravelRequestInfoCardComponent {
  private _requestId!: number;
  primaryStatus: string = 'Denied';

  forwardBtnTitle: string = 'Proceed';
  rejectBtnTitle: string = 'Reject';

  status: string = '';

  @Input()
  set requestId(value: number) {
    this._requestId = value;
  }

  travelRequestDetailViewModel!: TravelRequestDetailViewModel;

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private commonApiService: CommonAPIService,
    private requestService: RequestService,
    private travelRequestUIService: TravelRequestUiService
  ) {}

  ngOnInit() {
    this.initializeComponent();
  }

  initializeComponent() {
    this.commonApiService.GetTravelRequestById(this._requestId).subscribe({
      next: (data) => {
        this.travelRequestDetailViewModel = data;
      },
      error: (error: Error) => {
        console.log('problems in fetching data');
      },
      complete: () => {
        console.log('get request by id is done');
      },
    });

    this.requestService.getStatusName(this._requestId).subscribe({
      next: (data) => {
        console.log(this._requestId);
        console.log(data);
        this.status = data;
        console.log(this.status);
      },
      complete: () => {},
    });
  }

  onSeeMoreBtnClick() {
    const queryParams = { requestId: this._requestId };

    const userData = localStorage.getItem('userData');

    if (userData) {
      const userDataParsed = JSON.parse(userData);

      if (
        userDataParsed.role == 'Manager' &&
        userDataParsed.department == 'TA'
      ) {
        this.router.navigate(['traveladmin/requestdetail'], {
          queryParams: queryParams,
        });
      } else if (userDataParsed.role == 'Manager') {
        this.router.navigate(['manager/requestdetail'], {
          queryParams: queryParams,
        });
      }
      this.bsModalRef.hide();
    }
  }

  onProceedBtnClick() {
    const queryParams = { requestId: this._requestId };
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userDataParsed = JSON.parse(userData);

      if (
        userDataParsed.role == 'Manager' &&
        userDataParsed.department == 'TA'
      ) {
        this.router.navigate(['traveladmin/requestdetail'], {
          queryParams: queryParams,
        });
        this.bsModalRef.hide();
      } else if (userDataParsed.role == 'Manager') {
        //update manager id with the actual manager id
        const managerId = 4;

        this.travelRequestUIService.onManagerForwardTravelRequestForm(
          this._requestId,
          managerId
        );
        this.bsModalRef.hide();
      }
    }
  }

  //reject travel request
  onRejectBtnClick(){
    //body
  }
}
