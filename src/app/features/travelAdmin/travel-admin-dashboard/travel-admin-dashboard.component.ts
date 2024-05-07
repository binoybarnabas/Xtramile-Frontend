import { Component, OnInit } from '@angular/core';
import { TravelAdminDashboardService } from 'src/app/services/travelAdminServices/dashboardServices/travel-admin-dashboard.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// Define a type for the entry in tabs
type TabEntry = [string, string, string, string, string, string];

@Component({
  selector: 'app-travel-admin-dashboard',
  templateUrl: './travel-admin-dashboard.component.html',
  styleUrls: ['./travel-admin-dashboard.component.css']
})
export class TravelAdminDashboardComponent implements OnInit {

  request: string = '';
  employeeId: string = ''; // Assuming you have an employeeId variable defined.

  isSearchFilterNeededForDashboardTable: string = 'no';

  constructor(private service: TravelAdminDashboardService, private router:Router) { }

  ngOnInit() {
    this.fetchDataAndUpdateTabs(); 
  }

  tabs = [
    {
      name: 'Incoming',
      headings: ['REQ CODE', 'Requested By', 'From', 'To', 'Status', 'Remarks'],
      entries: [] as TabEntry[] // Explicitly typed as TabEntry[]
    },
    {
      name: 'Waiting',
      headings: ['REQ CODE', 'Requested By', 'From', 'To', 'Status', 'Remarks'],
      entries: [] as TabEntry[] // Explicitly typed as TabEntry[]
    },
    {
      name: 'Ongoing',
      headings: ['REQ CODE','Requested By', 'From', 'To', 'Status', 'Remarks'],
      entries: [] as TabEntry[] // Explicitly typed as TabEntry[]
    },
    {
      name: 'Completed',
      headings: ['REQ CODE', 'Requested By', 'From', 'To', 'Status', 'Remarks'],
      entries: [] as TabEntry[] // Explicitly typed as TabEntry[]
    }
  ];

travelAdminNotification : any[] = []

fetchDataAndUpdateTabs() {
  this.service.getAllTravelRequestDashboard().subscribe((data: any) => {
    this.tabs[0].entries = [];
    this.tabs[1].entries = [];
    this.tabs[2].entries = [];
    this.tabs[3].entries = [];
    this.travelAdminNotification = [];
    console.log('travel admin dashboard request',data)

    data.incomingRequests.forEach((request: any) => {
      this.tabs[0].entries.push([
        request.requestCode,
        request.name,
        request.sourceCity, 
        request.destinationCity, 
        'Incoming',
        request.status
      ] as TabEntry);
    });
    
    data.waitingSelectedRequests.forEach((request: any) => {
      var remarks=request.status==='Selected'?'Selected the option':'Selection pending';
      this.tabs[1].entries.push([
        request.requestCode,
        request.name,
        request.sourceCity, 
        request.destinationCity, 
        request.status,
        remarks
      ] as TabEntry);
    });

    data.ongoingRequests.forEach((request: any) => {
      this.tabs[2].entries.push([
        request.requestCode,
        request.name,
        request.sourceCity, 
        request.destinationCity, 
        'Ongoing',
        'Currently on trip'
      ] as TabEntry);
    });

    data.closedRequests.forEach((request: any) => {
      this.tabs[3].entries.push([
        request.requestCode,
        request.name,
        request.sourceCity, 
        request.destinationCity, 
        'Closed',
        'Trip Completed'
      ] as TabEntry);
    });

    this.travelAdminNotification = data.notifications;
    // console.log("travel admin notification",this.travelAdminNotification)
});
}
navigateWhenRowClicked(rowClick: string, row: TabEntry) {
  switch (rowClick) {
    case 'Incoming':
      this.router.navigate(['/traveladmin/incomingrequests']);
      break;
    case 'Ongoing':
      this.router.navigate(['/traveladmin/approved_requests']);
      break;
    case 'Completed':
      this.router.navigate(['/traveladmin/closed']);
      break;
    case 'Waiting':
      const status = row[4];
      if (status === 'Selected') {
        this.router.navigate(['/traveladmin/selected']);
      } else {
        this.router.navigate(['/traveladmin/waiting']);
      }
      break;
  }
}
}
