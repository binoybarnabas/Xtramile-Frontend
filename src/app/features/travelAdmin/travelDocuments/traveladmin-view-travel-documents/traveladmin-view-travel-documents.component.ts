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

  activeTabIndex: number = 0;
  filterId: number = 0;

  visaDocuments!: TravelDocuments[];
  passportDocuments!: TravelDocuments[];
  idCardDocuments!: TravelDocuments[];
  expiredVisaDocuments!: TravelDocuments[];
  expiredPassportDocuments!: TravelDocuments[];
  validVisaDocuments!: TravelDocuments[];
  validPassportDocuments!: TravelDocuments[];

  //Initialize this tabs array
  tabs: any = [];
  //initialize this filter array as per requirements
  //filterId should be unique
  //set the isActive value to 'yes' if a filter needs to enabled by default
  filters = [{'filterId':0,'filterName':'Show Expired Only','isActive':'no'},
           {'filterId':1,'filterName':'Show Valid Only','isActive':'no'}];
           
  constructor(private documentService: DocumentsService,
    private datepipe: DatePipe
    ){
  }

  ngOnInit(){
    this.onTabChange(this.activeTabIndex);
  }

  getAllVisas(){
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
  }

  getAllPassports(){
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
  }

  getAllIds(){
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

  getExpiredVisas(){
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
        this.initializeTabs(this.expiredVisaDocuments,this.expiredPassportDocuments,this.idCardDocuments);
      }
    })
  }

  getExpiredPassports(){
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
        this.initializeTabs(this.expiredVisaDocuments,this.expiredPassportDocuments,this.idCardDocuments);
      }
    })
  }

  getValidVisas(){
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
        this.initializeTabs(this.validVisaDocuments,this.validPassportDocuments,this.idCardDocuments);
      }
    })
  }

  getValidPassports(){
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
        this.initializeTabs(this.validVisaDocuments,this.validPassportDocuments,this.idCardDocuments);
      }
    })
  }

  onFilterToggled(filterId : number){
    this.filterId = filterId;
    if(this.tabs.name === 'ID Cards')
      return ;
    if(filterId === 0){
      if(this.filters[filterId].isActive === 'yes'){
        if(this.activeTabIndex === 0){
          if(!this.expiredVisaDocuments)
            this.getExpiredVisas();
          else
            this.initializeTabs(this.expiredVisaDocuments,this.expiredPassportDocuments,this.idCardDocuments);            
        }
        else if(this.activeTabIndex === 1){
          if(!this.expiredPassportDocuments)
            this.getExpiredPassports();
          else
            this.initializeTabs(this.expiredVisaDocuments,this.expiredPassportDocuments,this.idCardDocuments);            
        }
      }
      else{
        this.initializeTabs(this.visaDocuments,this.passportDocuments,this.idCardDocuments);
      }
    }
    else if(filterId === 1){
      if(this.filters[filterId].isActive === 'yes'){
        if(this.activeTabIndex === 0){
          if(!this.validVisaDocuments){
            this.getValidVisas();
          }
          else{
            this.initializeTabs(this.validVisaDocuments,this.validPassportDocuments,this.idCardDocuments);            
          }
        }
        else if(this.activeTabIndex === 1){
          if(!this.validPassportDocuments){
            this.getValidPassports();
          }
          else{
            this.initializeTabs(this.validVisaDocuments,this.validPassportDocuments,this.idCardDocuments);            
          }
        }
      }
      else{
        this.initializeTabs(this.visaDocuments,this.passportDocuments,this.idCardDocuments);
      }      
    }
  }

  initializeTabs(visa : TravelDocuments[], passport : TravelDocuments[], idCard : TravelDocuments[]) {
    if(this.activeTabIndex === 0){
      this.tabs = [
        {
            name: 'Visa',
            headings: ['Visa Number', 'Uploaded By', 'Issued Country', 'Expiry Date', 'Remaining Days', 'Actions'],
            entries: visa.map((item) => [
                item.identificationNumber,
                item.uploadedBy,
                item.country,
                item.expiryDate,
                item.expiresIn,
                item.documentURL
            ])
        },
        // Placeholder objects for other tabs
        { name: 'Passport', headings: [], entries: [] },
        { name: 'ID Card', headings: [], entries: [] }
    ];
    }
    else if(this.activeTabIndex === 1){
      this.tabs = [
        { name: 'Visa', headings: [], entries: [] },
        {
            name: 'Passport',
            headings: ['Passport Number', 'Uploaded By', 'Issued Country', 'Expiry Date', 'Remaining Days', 'Actions'],
            entries: passport.map((item) => [
                item.identificationNumber,
                item.uploadedBy,
                item.country,
                item.expiryDate,
                item.expiresIn,
                item.documentURL
            ])
        },
        { name: 'ID Card', headings: [], entries: [] }
    ];
    }
    else if(this.activeTabIndex === 2){
      this.tabs = [
        { name: 'Visa', headings: [], entries: [] },
        { name: 'Passport', headings: [], entries: [] },
        {
            name: 'ID Card',
            headings: ['ID Number', 'Uploaded By', 'Issued Country', 'Actions'],
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
  console.log(employeeName)
  let filteredVisaDocuments = this.visaDocuments;
  let filteredPassportDocuments = this.passportDocuments;
  let filteredIdCardDocuments = this.idCardDocuments;

  // Filter documents based on selected filter criteria
  if(this.filterId === 0){
    if(this.filters[this.filterId].isActive === 'yes'){
      filteredVisaDocuments = this.expiredVisaDocuments;
      filteredPassportDocuments = this.expiredPassportDocuments;
      filteredIdCardDocuments = this.idCardDocuments;
    }
  }
  else if(this.filterId === 1){
    if(this.filters[this.filterId].isActive === 'yes'){
                filteredVisaDocuments = this.validVisaDocuments;
          filteredPassportDocuments = this.validPassportDocuments;
          filteredIdCardDocuments = this.idCardDocuments;
    }
  }
  // Perform search on filtered documents
  if (employeeName !== '') {
    if(this.activeTabIndex === 0)
      filteredVisaDocuments = filteredVisaDocuments.filter(doc => doc.uploadedBy.toLowerCase().includes(employeeName.toLowerCase()));
    else if(this.activeTabIndex === 1)
      filteredPassportDocuments = filteredPassportDocuments.filter(doc => doc.uploadedBy.toLowerCase().includes(employeeName.toLowerCase()));
    else if(this.activeTabIndex ===2)
      filteredIdCardDocuments = filteredIdCardDocuments.filter(doc => doc.uploadedBy.toLowerCase().includes(employeeName.toLowerCase()));
  }

  // Initialize tabs with the filtered documents
  this.initializeTabs(filteredVisaDocuments, filteredPassportDocuments, filteredIdCardDocuments);
}

  onTabChange(activeTabIndex: number){
    this.activeTabIndex = activeTabIndex;
    if(this.filters[this.filterId].isActive === 'yes'){
      this.filters[this.filterId].isActive = 'no'
    }
    if(this.activeTabIndex === 0){
      if(!this.visaDocuments)
        this.getAllVisas();
      else
        this.initializeTabs(this.visaDocuments,this.passportDocuments,this.idCardDocuments);
    }
    else if(this.activeTabIndex === 1){
      if(!this.passportDocuments)
        this.getAllPassports()
      else
        this.initializeTabs(this.visaDocuments,this.passportDocuments,this.idCardDocuments);
    }
    else if(this.activeTabIndex === 2){
      if(!this.idCardDocuments)
        this.getAllIds();
      else
        this.initializeTabs(this.visaDocuments,this.passportDocuments,this.idCardDocuments);
    }
  }

}