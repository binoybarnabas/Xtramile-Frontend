import { Component } from '@angular/core';

@Component({
  selector: 'app-traveladmin-view-travel-documents',
  templateUrl: './traveladmin-view-travel-documents.component.html',
  styleUrls: ['./traveladmin-view-travel-documents.component.css']
})
export class TraveladminViewTravelDocumentsComponent {

  pageHeading: string = 'Travel Documents';

//initialize this filter array as per requirements
//filterId should be unique
//set the isActive value to 'yes' if a filter needs to enabled by default
filters = [{'filterId':'1','filterName':'Sort by Name','isActive':'no'},
          {'filterId':'2','filterName':'Sort by Date','isActive':'no'},
          {'filterId':'3','filterName':'Sort by Country','isActive':'no'},
          {'filterId':'4','filterName':'Show Expired Only','isActive':'no'}

        ];


//Initialize this tabs array with input values
tabs = [
  {
    name: 'Visa',
    headings: ['Visa Number', 'Uploaded By', 'Uploaded On', 'Issued Country', 'Valid Thru', 'Status', 'Action'],
    entries: [
      ['KZ00O1', 'Abhinav Nair', '12-02-24', 'USA', '12-02-28', 'Valid', 'Open'],
      ['KLS002', 'Abhijit', '12-02-24', 'UK', '12-02-28', 'Valid', 'Open'],
      ['BCV008', 'Bivina MC', '12-02-24', 'KSA', '12-02-28', 'Valid', 'Open'],
      ['DEF456', 'John Smith', '12-02-25', 'Canada', '12-03-01', 'Valid', 'Open'],
      ['GHI789', 'Jane Doe', '12-02-25', 'Australia', '12-03-01', 'Valid', 'Open']
    ]
  },
  {
    name: 'Passports',
    headings: ['Passport Number', 'Issued Country', 'Issue Date', 'Expiry Date', 'Holder Name'],
    entries: [
      ['ABCD123456', 'USA', '2023-01-15', '2028-01-15', 'John Doe'],
      ['EFGH789012', 'UK', '2022-06-20', '2027-06-20', 'Jane Smith'],
      ['IJKL345678', 'Canada', '2024-03-10', '2029-03-10', 'Alex Johnson'],
      ['MNOP567890', 'Australia', '2023-08-05', '2028-08-05', 'Sarah Brown'],
      ['QRST123456', 'Germany', '2022-11-30', '2027-11-30', 'Mark Wilson']
    ]
  },
  {
    name: 'ID Cards',
    headings: ['ID Number', 'Issued Country', 'Issue Date', 'Expiry Date', 'Holder Name'],
    entries: [
      ['ID12345', 'Government of USA', '2022-12-01', '2027-12-01', 'Michael Brown'],
      ['ID67890', 'Government of UK', '2023-05-18', '2028-05-18', 'Emily Davis'],
      ['ID24680', 'Government of Canada', '2024-08-30', '2029-08-30', 'William Wilson'],
      ['ID13579', 'Government of Australia', '2023-11-15', '2028-11-15', 'Sophia Johnson'],
      ['ID86420', 'Government of Germany', '2022-10-05', '2027-10-05', 'James Smith']
    ]
  }
];



}
