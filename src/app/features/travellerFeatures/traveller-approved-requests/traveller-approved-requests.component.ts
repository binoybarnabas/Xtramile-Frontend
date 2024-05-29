import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CustomLoaderService } from 'src/app/services/helperServices/commonUIServices/custom-loader-service/custom-loader.service';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-traveller-approved-requests',
  templateUrl: './traveller-approved-requests.component.html',
  styleUrls: ['./traveller-approved-requests.component.css']
})
export class TravellerApprovedRequestsComponent {

  pageHeading: string = 'Approved Requests'
  
  tableHeaders: string[] = ['Request Code', 'Project Code', 'From', 'To', 'Departure Date', 'Return Date', 'Purpose','Status'];
  fieldsToDisplay: string[] = ['requestCode', 'projectCode', 'from', 'to', 'startDate', 'endDate', 'reason', 'statusName'];
  incomingRequestdata: any[] = [];

  constructor(private apiservice: RequestService,private router: Router,private activatedRoute: ActivatedRoute, private loaderService : CustomLoaderService) { }

  userData = localStorage.getItem('userData');
  parsedUserData = this.userData ? JSON.parse(this.userData) : ''

  employeeId: number = this.parsedUserData.empId;

  currentPage: number = 1;

  itemsPerPage: number = 10;

  totalCount: number = 0;

  ngOnInit() {
    this.getOngoingRequests();
  }

  getOngoingRequests(){

    this.loaderService.show();

    this.apiservice.getEmployeeOngoingRequest(this.employeeId, this.currentPage, this.itemsPerPage).subscribe((data) => {

      this.loaderService.hide();

      this.incomingRequestdata = this.formatData(data.items);
      this.totalCount = data.totalCount;
    });
  }

  formatData(data: any[]): any[] {
    //using DatePipe to convert the date into dd/LL/yyyy format
    const datePipe = new DatePipe('en-US');
    return data.map(item => ({
      ...item,
      startDate: datePipe.transform(item.startDate, 'dd/LL/yyyy'),
      endDate: datePipe.transform(item.endDate, 'dd/LL/yyyy')
    }));
  }

  onPageChange(event:any){
    this.currentPage = event.page;
    this.getOngoingRequests();
  }

  selectedRow: any | null = null;
  requestId: number = 0;
  handleSelectedRow(row: any) {
    
    this.selectedRow = row;
    this.requestId = this.selectedRow.requestId;

    this.router.navigate(['requests/progress'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: { requestId: this.requestId }
    })

  }
}
