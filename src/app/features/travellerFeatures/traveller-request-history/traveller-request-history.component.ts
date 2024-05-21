import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CustomLoaderService } from 'src/app/services/helperServices/commonUIServices/custom-loader-service/custom-loader.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';

@Component({
  selector: 'app-traveller-request-history',
  templateUrl: './traveller-request-history.component.html',
  styleUrls: ['./traveller-request-history.component.css'],
})
export class TravellerRequestHistoryComponent {
  constructor(
    private employeeService: RequestService,
    private datepipe: DatePipe,
    private loaderService: CustomLoaderService
  ) {}

  requestData = [];

  empId: number = 0;
  pageSize = 10;
  pageIndex = 1;
  totalCount = 0;
  currentPage = 1;
  tableHeaders = [
    'Request Code',
    'Project Code',
    'From',
    'To',
    'Requested On',
    'Closed On',
    'Status',
  ];
  dataHeaders = [
    'requestCode',
    'projectCode',
    'from',
    'to',
    'requestedOn',
    'closedOn',
    'status',
  ];

  pageHeading: string = 'Request History';

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userDataParsed = JSON.parse(userData);
      this.empId = userDataParsed.empId;
    }
    this.fetchRequestHistory();
  }

  fetchRequestHistory() {
    this.loaderService.show();

    this.employeeService
      .getEmployeeRequestHisory(this.empId, this.pageIndex, this.pageSize)
      .subscribe({
        next: (data) => {
          this.loaderService.hide();

          data.employeeRequest.forEach((request: any) => {
            (request.requestedOn = this.datepipe.transform(
              request.requestedOn,
              'dd/MM/yyyy'
            )),
              (request.closedOn = this.datepipe.transform(
                request.closedOn,
                'dd/MM/yyyy'
              ));
          });
          this.requestData = data.employeeRequest;
          this.totalCount = data.totalCount;
        },

        error: (error) => {
          console.log('error fetching closed requests: ', error);
        },
      });
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.fetchRequestHistory();
  }
}
