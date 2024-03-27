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
    this.getAllDocuments();
  }

  getAllDocuments(){
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

  getExpiredDocuments(){
    this.documentService.getExpiredTravelDocumentByType('Visa').subscribe({
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

    this.documentService.getExpiredTravelDocumentByType('Passport').subscribe({
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

    this.documentService.getExpiredTravelDocumentByType('ID Card').subscribe({
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

  getValidDocuments(){
    this.documentService.getValidTravelDocumentsByType('Visa').subscribe({
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

    this.documentService.getValidTravelDocumentsByType('Passport').subscribe({
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

    this.documentService.getValidTravelDocumentsByType('ID Card').subscribe({
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
filters = [{'filterId':'1','filterName':'Show Expired Only','isActive':'no'},
           {'filterId':'2','filterName':'Show Valid Only','isActive':'no'}];

onFilterToggled(filterId : string){
  for(let i=0; i< this.filters.length; i++){
    if(this.filters[i].filterId === filterId){
      if(this.filters[i].filterId === '1')
      {
        if(this.filters[i].isActive === 'yes')
          this.getExpiredDocuments();
        else
          this.getAllDocuments();
      }
      else if(this.filters[i].filterId === '2'){
        if(this.filters[i].isActive === 'yes')
          this.getValidDocuments();
        else
          this.getAllDocuments();
      }
    }
  }
}

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