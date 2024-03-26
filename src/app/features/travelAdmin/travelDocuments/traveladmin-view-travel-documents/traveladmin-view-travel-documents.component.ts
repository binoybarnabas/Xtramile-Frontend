import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { TravelDocuments } from 'src/app/services/interfaces/iTravelDocuments';

@Component({
  selector: 'app-traveladmin-view-travel-documents',
  templateUrl: './traveladmin-view-travel-documents.component.html',
  styleUrls: ['./traveladmin-view-travel-documents.component.css']
})
export class TraveladminViewTravelDocumentsComponent {

  pageHeading: string = 'Travel Documents';

  visaDocuments!: TravelDocuments[];
  passportDocuments!: TravelDocuments[];
  idCardDocuments!: TravelDocuments[];

  constructor(private documentService: DocumentsService,
    private datepipe: DatePipe
    ){
  }

  ngOnInit(){
    //Get all Visas
    this.documentService.getTravelDocumentByType('Visa').subscribe({
      next : (data) => {
        data.forEach((doc) => {
          doc.expiryDate = this.datepipe.transform(doc.expiryDate, "dd/MM/yyyy") || ' '
        })
        this.visaDocuments = data
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.initializeTabs();
      }
    })

    //Get sll Passports
    this.documentService.getTravelDocumentByType('Passport').subscribe({
      next : (data) => {
        data.forEach((doc) => {
          doc.expiryDate = this.datepipe.transform(doc.expiryDate, "dd/MM/yyyy") || ' '
        })
        this.passportDocuments = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.initializeTabs();
      }
    })

    //Get all IdCards    
    this.documentService.getTravelDocumentByType('ID Card').subscribe({
      next : (data) => {
        this.idCardDocuments = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.initializeTabs();
      }
    })
  }

//initialize this filter array as per requirements
//filterId should be unique
//set the isActive value to 'yes' if a filter needs to enabled by default
filters = [{'filterId':'1','filterName':'Sort by Name','isActive':'no'},
          {'filterId':'2','filterName':'Sort by Date','isActive':'no'},
          {'filterId':'3','filterName':'Sort by Country','isActive':'no'},
          {'filterId':'4','filterName':'Show Expired Only','isActive':'no'}

        ];

  initializeTabs() {
    if (this.visaDocuments && this.passportDocuments && this.idCardDocuments) {
      this.tabs = [
        {
          name: 'Visa',
          headings: ['Visa Number', 'Uploaded By', 'Issued Country', 'Expiry Date', 'Remaining Days', 'Action'],
          entries: this.visaDocuments.map((item) => [
            item.identificationNumber,
            item.uploadedBy,
            item.country,
            item.expiryDate,
            item.remainingDays,
            item.documentURL
          ])
        },
        {
          name: 'Passports',
          headings: ['Passport Number', 'Uploaded By', 'Issued Country', 'Expiry Date', 'Remaining Days', 'Action'],
          entries: this.passportDocuments.map((item) => [
            item.identificationNumber,
            item.uploadedBy,
            item.country,
            item.expiryDate,
            item.remainingDays,
            item.documentURL
          ])
        },
        {
          name: 'ID Cards',
          headings: ['ID Number', 'Uploaded By', 'Issued Country', 'Action' ],
          entries: this.idCardDocuments.map((item) => [
            item.identificationNumber,
            item.uploadedBy,
            item.country,
            item.documentURL
          ])
        }
      ];
    }
  }
//Initialize this tabs array
tabs: any = [];

}