import { Component } from '@angular/core';

@Component({
  selector: 'app-travel-admin-dashboard',
  templateUrl: './travel-admin-dashboard.component.html',
  styleUrls: ['./travel-admin-dashboard.component.css']
})
export class TravelAdminDashboardComponent {


  isSearchFilterNeededForDashboardTable:string = 'no';

//Initialize this tabs array with input values
tabs = [
  {
    name: 'Incoming',
    headings: ['REQ CODE', 'Requested By', 'From', 'To', 'Status', 'Remarks'],
    entries: [
      ['KZ00O1', 'Abhinav Nair', 'UK', 'USA',  'Pending', 'Needs approval'],
      ['KLS002', 'Abhijit', 'Ireland', 'UK',  'Approved', 'Ready for processing'],
      ['BCV008', 'Bivina MC', 'Dubai', 'KSA', 'Pending', 'Waiting for confirmation'],
      ['DEF456', 'John Smith', 'Trivandrum', 'Canada', 'Approved', 'Proceeding with booking'],
      ['GHI789', 'Jane Doe', 'Kochi', 'Australia',  'Pending', 'Additional details required']
    ]
  },
  {
    name: 'Waiting',
    headings: ['REQ CODE', 'Requested By', 'From', 'To', 'Status', 'Remarks'],
    entries: [
      ['JKL012', 'Michael Brown', 'USA', 'UK', 'Pending', 'Awaiting confirmation'],
      ['MNO345', 'Emily Davis', 'Canada', 'USA', 'Pending', 'Waiting for approval'],
      ['PQR678', 'William Wilson', 'UK', 'Germany', 'Pending', 'Reviewing details'],
      ['STU901', 'Sophia Johnson', 'Australia', 'Canada', 'Pending', 'Processing request'],
      ['VWX234', 'James Smith', 'Germany', 'UK', 'Pending', 'Awaiting further instructions']
    ]
  },
  {
    name: 'Selected',
    headings: ['REQ CODE', 'Requested By', 'From', 'To', 'Status', 'Remarks'],
    entries: [
      ['ABC123', 'Alex Johnson', 'Canada', 'USA', 'Selected', 'Confirmed booking'],
      ['DEF456', 'Sarah Brown', 'Australia', 'UK', 'Selected', 'Flight details sent'],
      ['GHI789', 'Mark Wilson', 'Germany', 'Canada', 'Selected', 'Hotel reservation completed']
    ]
  },
  {
    name: 'Ongoing',
    headings: ['REQ CODE', 'Requested By', 'From', 'To', 'Status', 'Remarks'],
    entries: [
      ['XYZ567', 'Nicole Anderson', 'UK', 'Australia', 'In Progress', 'Processing documents'],
      ['UVW890', 'Chris Evans', 'USA', 'Germany', 'In Progress', 'Preparing for travel'],
      ['LMN345', 'Emma Watson', 'Canada', 'India', 'In Progress', 'Coordinating transportation']
    ]
  }
];



}