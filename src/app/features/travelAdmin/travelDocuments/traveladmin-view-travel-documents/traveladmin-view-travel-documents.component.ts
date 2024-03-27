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
  expiredVisaDocuments!: TravelDocuments[];
  expiredPassportDocuments!: TravelDocuments[];
  expiredIdCardDocuments!: TravelDocuments[];
  validVisaDocuments!: TravelDocuments[];
  validPassportDocuments!: TravelDocuments[];
  validIdCardDocuments!: TravelDocuments[];

  constructor(private documentService: DocumentsService,
    private datepipe: DatePipe
    ){
  }

  ngOnInit(){
    this.getAllDocuments();
    this.getExpiredDocuments();
    this.getValidDocuments();
  }

  getAllDocuments(){
    //Get all Visas
    this.documentService.getTravelDocumentByType('Visa').subscribe({
      next : (data) => {
        data.forEach((doc) => {
          doc.expiryDate = this.datepipe.transform(doc.expiryDate, "dd/MM/yyyy") || ' ',
          doc.expiresIn = this.getRemainingDaysMessage(doc.remainingDays)
        })
        this.visaDocuments = data
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.initializeTabs(this.visaDocuments,this.passportDocuments,this.idCardDocuments);
      }
    })
    
    //Get all Passports
    this.documentService.getTravelDocumentByType('Passport').subscribe({
      next : (data) => {
        data.forEach((doc) => {
          doc.expiryDate = this.datepipe.transform(doc.expiryDate, "dd/MM/yyyy") || ' ',
          doc.expiresIn = this.getRemainingDaysMessage(doc.remainingDays)
        })
        this.passportDocuments = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.initializeTabs(this.visaDocuments,this.passportDocuments,this.idCardDocuments);
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
        this.initializeTabs(this.visaDocuments,this.passportDocuments,this.idCardDocuments);
      }
    })
  }

  getExpiredDocuments(){
    this.documentService.getExpiredTravelDocumentByType('Visa').subscribe({
      next : (data) => {
        data.forEach((doc) => {
          doc.expiryDate = this.datepipe.transform(doc.expiryDate, "dd/MM/yyyy") || ' ',
          doc.expiresIn = this.getRemainingDaysMessage(doc.remainingDays)
        })
        this.expiredVisaDocuments = data
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      }
    })

    this.documentService.getExpiredTravelDocumentByType('Passport').subscribe({
      next : (data) => {
        data.forEach((doc) => {
          doc.expiryDate = this.datepipe.transform(doc.expiryDate, "dd/MM/yyyy") || ' ',
          doc.expiresIn = this.getRemainingDaysMessage(doc.remainingDays)
        })
        this.expiredPassportDocuments = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      }
    })

    this.documentService.getExpiredTravelDocumentByType('ID Card').subscribe({
      next : (data) => {
        this.expiredIdCardDocuments = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      }
    })
  }

  getValidDocuments(){
    this.documentService.getValidTravelDocumentsByType('Visa').subscribe({
      next : (data) => {
        data.forEach((doc) => {
          doc.expiryDate = this.datepipe.transform(doc.expiryDate, "dd/MM/yyyy") || ' ',
          doc.expiresIn = this.getRemainingDaysMessage(doc.remainingDays)
        })
        this.validVisaDocuments = data
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      }
    })

    this.documentService.getValidTravelDocumentsByType('Passport').subscribe({
      next : (data) => {
        data.forEach((doc) => {
          doc.expiryDate = this.datepipe.transform(doc.expiryDate, "dd/MM/yyyy") || ' ',
          doc.expiresIn = this.getRemainingDaysMessage(doc.remainingDays)
        })
        this.validPassportDocuments = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      }
    })

    this.documentService.getValidTravelDocumentsByType('ID Card').subscribe({
      next : (data) => {
        this.validIdCardDocuments = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      }
    })
  }


//initialize this filter array as per requirements
//filterId should be unique
//set the isActive value to 'yes' if a filter needs to enabled by default
filters = [{'filterId':'1','filterName':'Show Expired Only','isActive':'no'},
           {'filterId':'2','filterName':'Show Valid Only','isActive':'no'}];

onFilterToggled(filterId : string){
  if(this.tabs.name === 'ID Cards')
    return ;
  for(let i=0; i< this.filters.length; i++){
    if(this.filters[i].filterId === filterId){
      if(this.filters[i].filterId === '1')
      {
        if(this.filters[i].isActive === 'yes')
        this.initializeTabs(this.expiredVisaDocuments,this.expiredPassportDocuments,this.expiredIdCardDocuments);
        else
        this.initializeTabs(this.visaDocuments,this.passportDocuments,this.idCardDocuments);
      }
      else if(this.filters[i].filterId === '2'){
        if(this.filters[i].isActive === 'yes')
        this.initializeTabs(this.validVisaDocuments,this.validPassportDocuments,this.validIdCardDocuments);
        else
        this.initializeTabs(this.visaDocuments,this.passportDocuments,this.idCardDocuments);
      }
    }
  }
}

  initializeTabs(visa : TravelDocuments[], passport : TravelDocuments[], idCard : TravelDocuments[]) {
    if (visa && passport && idCard) {
      this.tabs = [
        {
          name: 'Visa',
          headings: ['Visa Number', 'Uploaded By', 'Issued Country', 'Expiry Date', 'Remaining Days', 'Action'],
          entries: visa.map((item) => [
            item.identificationNumber,
            item.uploadedBy,
            item.country,
            item.expiryDate,
            item.expiresIn,
            item.documentURL
          ])
        },
        {
          name: 'Passports',
          headings: ['Passport Number', 'Uploaded By', 'Issued Country', 'Expiry Date', 'Remaining Days', 'Action'],
          entries: passport.map((item) => [
            item.identificationNumber,
            item.uploadedBy,
            item.country,
            item.expiryDate,
            item.expiresIn,
            item.documentURL
          ])
        },
        {
          name: 'ID Cards',
          headings: ['ID Number', 'Uploaded By', 'Issued Country', 'Action' ],
          entries: idCard.map((item) => [
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

getRemainingDaysMessage(remainingDays: number): string {
  if(remainingDays > 0){
    if(remainingDays === 1)
      return `Expires in 1 day`
    else
      return `Expires in ${remainingDays} days`;
  }
  else if(remainingDays < 0){
    if(remainingDays === -1)
      return `Expired 1 day ago`
    else
    return `Expired ${Math.abs(remainingDays)} days ago`;
  }
  else
    return 'Expires Today'
}

onSearch(employeeName: string) {
  // let filteredVisaDocuments = this.visaDocuments;
  // let filteredPassportDocuments = this.passportDocuments;
  // let filteredIdCardDocuments = this.idCardDocuments;

  // // Filter documents based on selected filter criteria
  // for (const filter of this.filters) {
  //   if (filter.isActive === 'yes') {
  //     switch (filter.filterId) {
  //       case '1': // Show Expired Only
  //         filteredVisaDocuments = this.expiredVisaDocuments;
  //         filteredPassportDocuments = this.expiredPassportDocuments;
  //         filteredIdCardDocuments = this.expiredIdCardDocuments;
  //         break;
  //       case '2': // Show Valid Only
  //         filteredVisaDocuments = this.validVisaDocuments;
  //         filteredPassportDocuments = this.validPassportDocuments;
  //         filteredIdCardDocuments = this.validIdCardDocuments;
  //         break;
  //     }
  //   }
  // }

  // // Perform search on filtered documents
  // if (employeeName !== '') {
  //   filteredVisaDocuments = filteredVisaDocuments.filter(doc => doc.uploadedBy.toLowerCase().includes(employeeName.toLowerCase()));
  //   filteredPassportDocuments = filteredPassportDocuments.filter(doc => doc.uploadedBy.toLowerCase().includes(employeeName.toLowerCase()));
  //   filteredIdCardDocuments = filteredIdCardDocuments.filter(doc => doc.uploadedBy.toLowerCase().includes(employeeName.toLowerCase()));
  // }

  // // Initialize tabs with the filtered documents
  // this.initializeTabs(filteredVisaDocuments, filteredPassportDocuments, filteredIdCardDocuments);
}


}