import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CustomLoaderService } from 'src/app/services/helperServices/commonUIServices/custom-loader-service/custom-loader.service';
import { DocumentsService } from 'src/app/services/apiServices/travelDocumentAPIServices/documents.service';
import { TravelDocuments } from 'src/app/models/interfaces/iTravelDocuments';
import { CustomToastService } from 'src/app/services/helperServices/toastServices/custom-toast.service';

@Component({
  selector: 'app-traveladmin-view-travel-documents',
  templateUrl: './traveladmin-view-travel-documents.component.html',
  styleUrls: ['./traveladmin-view-travel-documents.component.css'],
})
export class TraveladminViewTravelDocumentsComponent {
  pageHeading: string = 'Travel Documents';

  activeTabIndex: number = 0;
  filterId: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalVisas: number = 0;
  totalPassPorts: number = 0;
  totalIDs: number = 0;
  totalExpiredVisas: number = 0;
  totalValidVisas: number = 0;
  totalExpiredPassports: number = 0;
  totalValidPassports: number = 0;
  totalItems: number[] = [this.totalVisas, this.totalPassPorts, this.totalIDs];
  totalExpiredItems: number[] = [
    this.totalExpiredVisas,
    this.totalExpiredPassports,
    this.totalIDs,
  ];
  totalValidItems: number[] = [
    this.totalValidVisas,
    this.totalValidPassports,
    this.totalIDs,
  ];

  visaDocuments: TravelDocuments[][] = [];
  passportDocuments: TravelDocuments[][] = [];
  idCardDocuments: TravelDocuments[][] = [];
  expiredVisaDocuments: TravelDocuments[][] = [];
  expiredPassportDocuments: TravelDocuments[][] = [];
  validVisaDocuments: TravelDocuments[][] = [];
  validPassportDocuments: TravelDocuments[][] = [];
  filteredDocuments!: TravelDocuments[];

  //Initialize this tabs array
  tabs: any = [];
  //initialize this filter array as per requirements
  //filterId should be unique
  //set the isActive value to 'yes' if a filter needs to enabled by default
  filters = [
    { filterId: 0, filterName: 'Show Expired Only', isActive: 'no' },
    { filterId: 1, filterName: 'Show Valid Only', isActive: 'no' },
  ];

  constructor(
    private documentService: DocumentsService,
    private datepipe: DatePipe,
    private loaderService: CustomLoaderService,
    private toastService: CustomToastService
  ) {}

  ngOnInit() {
    this.onTabChange(this.activeTabIndex);
  }

  getAllVisas() {
    this.loaderService.show();

    this.documentService
      .getTravelDocumentByType('Visa', this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (data) => {
          this.loaderService.hide();

          data.items.forEach((doc: TravelDocuments) => {
            (doc.expiryDate =
              this.datepipe.transform(doc.expiryDate, 'dd/MM/yyyy') || ' '),
              (doc.expiresIn = this.getRemainingDaysMessage(doc.remainingDays));
          });
          this.visaDocuments[this.currentPage - 1] = data.items;
          this.totalVisas = data.totalCount;
        },
        error: (error) => {
          console.log(error);
          this.loaderService.hide();
          this.toastService.showToast({
            message: error.message,
            toastType: 'fail',
            toastDuration: 5000,
          });
        },
        complete: () => {
          this.initializeTabs(
            this.visaDocuments[this.currentPage - 1],
            this.passportDocuments[this.currentPage - 1],
            this.idCardDocuments[this.currentPage - 1]
          );
          this.totalItems = [
            this.totalVisas,
            this.totalPassPorts,
            this.totalIDs,
          ];
        },
      });
  }

  getAllPassports() {
    this.loaderService.show();

    this.documentService
      .getTravelDocumentByType('Passport', this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (data) => {
          this.loaderService.hide();

          data.items.forEach((doc: TravelDocuments) => {
            (doc.expiryDate =
              this.datepipe.transform(doc.expiryDate, 'dd/MM/yyyy') || ' '),
              (doc.expiresIn = this.getRemainingDaysMessage(doc.remainingDays));
          });
          this.passportDocuments[this.currentPage - 1] = data.items;
          this.totalPassPorts = data.totalCount;
        },
        error: (error) => {
          this.loaderService.hide();
          console.log(error);
        },
        complete: () => {
          this.initializeTabs(
            this.visaDocuments[this.currentPage - 1],
            this.passportDocuments[this.currentPage - 1],
            this.idCardDocuments[this.currentPage - 1]
          );
          this.totalItems = [
            this.totalVisas,
            this.totalPassPorts,
            this.totalIDs,
          ];
        },
      });
  }

  getAllIds() {
    this.loaderService.show();

    this.documentService
      .getTravelDocumentByType('ID Card', this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (data) => {
          this.loaderService.hide();

          this.idCardDocuments[this.currentPage - 1] = data.items;
          this.totalIDs = data.totalCount;
        },
        error: (error) => {
          this.loaderService.hide();
          console.log(error);
        },
        complete: () => {
          this.initializeTabs(
            this.visaDocuments[this.currentPage - 1],
            this.passportDocuments[this.currentPage - 1],
            this.idCardDocuments[this.currentPage - 1]
          );
          this.totalItems = [
            this.totalVisas,
            this.totalPassPorts,
            this.totalIDs,
          ];
        },
      });
  }

  getExpiredVisas() {
    this.loaderService.show();

    this.documentService
      .getExpiredTravelDocumentByType(
        'Visa',
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (data) => {
          this.loaderService.hide();

          data.items.forEach((doc: TravelDocuments) => {
            (doc.expiryDate =
              this.datepipe.transform(doc.expiryDate, 'dd/MM/yyyy') || ' '),
              (doc.expiresIn = this.getRemainingDaysMessage(doc.remainingDays));
          });
          this.expiredVisaDocuments[this.currentPage - 1] = data.items;
          this.totalExpiredVisas = data.totalCount;
        },
        error: (error) => {
          this.loaderService.hide();
          console.log(error);
        },
        complete: () => {
          this.initializeTabs(
            this.expiredVisaDocuments[this.currentPage - 1],
            this.expiredPassportDocuments[this.currentPage - 1],
            this.idCardDocuments[this.currentPage - 1]
          );
          this.totalExpiredItems = [
            this.totalExpiredVisas,
            this.totalExpiredPassports,
            this.totalIDs,
          ];
        },
      });
  }

  getExpiredPassports() {
    this.loaderService.show();

    this.documentService
      .getExpiredTravelDocumentByType(
        'Passport',
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (data) => {
          this.loaderService.hide();

          data.items.forEach((doc: TravelDocuments) => {
            (doc.expiryDate =
              this.datepipe.transform(doc.expiryDate, 'dd/MM/yyyy') || ' '),
              (doc.expiresIn = this.getRemainingDaysMessage(doc.remainingDays));
          });
          this.expiredPassportDocuments[this.currentPage - 1] = data.items;
          this.totalExpiredPassports = data.totalCount;
        },
        error: (error) => {
          this.loaderService.hide();
          console.log(error);
        },
        complete: () => {
          this.initializeTabs(
            this.expiredVisaDocuments[this.currentPage - 1],
            this.expiredPassportDocuments[this.currentPage - 1],
            this.idCardDocuments[this.currentPage - 1]
          );
          this.totalExpiredItems = [
            this.totalExpiredVisas,
            this.totalExpiredPassports,
            this.totalIDs,
          ];
        },
      });
  }

  getValidVisas() {
    this.loaderService.show();

    this.documentService
      .getValidTravelDocumentsByType(
        'Visa',
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (data) => {
          this.loaderService.hide();

          data.items.forEach((doc: TravelDocuments) => {
            (doc.expiryDate =
              this.datepipe.transform(doc.expiryDate, 'dd/MM/yyyy') || ' '),
              (doc.expiresIn = this.getRemainingDaysMessage(doc.remainingDays));
          });
          this.validVisaDocuments[this.currentPage - 1] = data.items;
          this.totalValidVisas = data.totalCount;
        },
        error: (error) => {
          this.loaderService.hide();
          console.log(error);
        },
        complete: () => {
          this.initializeTabs(
            this.validVisaDocuments[this.currentPage - 1],
            this.validPassportDocuments[this.currentPage - 1],
            this.idCardDocuments[this.currentPage - 1]
          );
          this.totalValidItems = [
            this.totalValidVisas,
            this.totalValidPassports,
            this.totalIDs,
          ];
        },
      });
  }

  getValidPassports() {
    this.loaderService.show();

    this.documentService
      .getValidTravelDocumentsByType(
        'Passport',
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (data) => {
          this.loaderService.hide();

          data.items.forEach((doc: TravelDocuments) => {
            (doc.expiryDate =
              this.datepipe.transform(doc.expiryDate, 'dd/MM/yyyy') || ' '),
              (doc.expiresIn = this.getRemainingDaysMessage(doc.remainingDays));
          });
          this.validPassportDocuments[this.currentPage - 1] = data.items;
          this.totalValidPassports = data.totalCount;
        },
        error: (error) => {
          this.loaderService.hide();
          console.log(error);
        },
        complete: () => {
          this.initializeTabs(
            this.validVisaDocuments[this.currentPage - 1],
            this.validPassportDocuments[this.currentPage - 1],
            this.idCardDocuments[this.currentPage - 1]
          );
          this.totalValidItems = [
            this.totalValidVisas,
            this.totalValidPassports,
            this.totalIDs,
          ];
        },
      });
  }

  onFilterToggled(filterId: number) {
    this.filterId = filterId;
    if (this.tabs.name === 'ID Cards') return;
    this.updateRequests();
  }

  initializeTabs(
    visa: TravelDocuments[],
    passport: TravelDocuments[],
    idCard: TravelDocuments[]
  ) {
    if (this.activeTabIndex === 0) {
      this.tabs = [
        {
          name: 'Visa',
          headings: [
            'Visa Number',
            'Uploaded By',
            'Issued Country',
            'Expiry Date',
            'Remaining Days',
            'Actions',
          ],
          entries: visa.map((item) => [
            item.identificationNumber,
            item.uploadedBy,
            item.country,
            item.expiryDate,
            item.expiresIn,
            item.documentURL,
          ]),
        },
        // Placeholder objects for other tabs
        { name: 'Passport', headings: [], entries: [] },
        { name: 'ID Card', headings: [], entries: [] },
      ];
    } else if (this.activeTabIndex === 1) {
      this.tabs = [
        { name: 'Visa', headings: [], entries: [] },
        {
          name: 'Passport',
          headings: [
            'Passport Number',
            'Uploaded By',
            'Issued Country',
            'Expiry Date',
            'Remaining Days',
            'Actions',
          ],
          entries: passport.map((item) => [
            item.identificationNumber,
            item.uploadedBy,
            item.country,
            item.expiryDate,
            item.expiresIn,
            item.documentURL,
          ]),
        },
        { name: 'ID Card', headings: [], entries: [] },
      ];
    } else if (this.activeTabIndex === 2) {
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
            item.documentURL,
          ]),
        },
      ];
    }
  }

  updateRequests() {
    if (this.filters[this.filterId].isActive === 'yes') {
      if (this.filterId === 0) {
        switch (this.activeTabIndex) {
          case 0: {
            if (!this.expiredVisaDocuments[this.currentPage - 1])
              this.getExpiredVisas();
            else
              this.initializeTabs(
                this.expiredVisaDocuments[this.currentPage - 1],
                this.expiredPassportDocuments[this.currentPage - 1],
                this.idCardDocuments[this.currentPage - 1]
              );
            break;
          }
          case 1: {
            if (!this.expiredPassportDocuments[this.currentPage - 1])
              this.getExpiredPassports();
            else
              this.initializeTabs(
                this.expiredVisaDocuments[this.currentPage - 1],
                this.expiredPassportDocuments[this.currentPage - 1],
                this.idCardDocuments[this.currentPage - 1]
              );
            break;
          }
        }
      } else if (this.filterId === 1) {
        switch (this.activeTabIndex) {
          case 0: {
            if (!this.validVisaDocuments[this.currentPage - 1])
              this.getValidVisas();
            else
              this.initializeTabs(
                this.validVisaDocuments[this.currentPage - 1],
                this.validPassportDocuments[this.currentPage - 1],
                this.idCardDocuments[this.currentPage - 1]
              );
            break;
          }
          case 1: {
            if (!this.validPassportDocuments[this.currentPage - 1])
              this.getValidPassports();
            else
              this.initializeTabs(
                this.validVisaDocuments[this.currentPage - 1],
                this.validPassportDocuments[this.currentPage - 1],
                this.idCardDocuments[this.currentPage - 1]
              );
            break;
          }
        }
      }
    } else {
      switch (this.activeTabIndex) {
        case 0: {
          if (!this.visaDocuments[this.currentPage - 1]) this.getAllVisas();
          else
            this.initializeTabs(
              this.visaDocuments[this.currentPage - 1],
              this.passportDocuments[this.currentPage - 1],
              this.idCardDocuments[this.currentPage - 1]
            );
          break;
        }
        case 1: {
          if (!this.passportDocuments[this.currentPage - 1])
            this.getAllPassports();
          else
            this.initializeTabs(
              this.visaDocuments[this.currentPage - 1],
              this.passportDocuments[this.currentPage - 1],
              this.idCardDocuments[this.currentPage - 1]
            );
          break;
        }
        case 2: {
          if (!this.idCardDocuments[this.currentPage - 1]) this.getAllIds();
          else
            this.initializeTabs(
              this.visaDocuments[this.currentPage - 1],
              this.passportDocuments[this.currentPage - 1],
              this.idCardDocuments[this.currentPage - 1]
            );
          break;
        }
      }
    }
  }

  getRemainingDaysMessage(remainingDays: number): string {
    if (remainingDays > 0) {
      if (remainingDays === 1) return `Expires in 1 day`;
      else return `Expires in ${remainingDays} days`;
    } else if (remainingDays < 0) {
      if (remainingDays === -1) return `Expired 1 day ago`;
      else return `Expired ${Math.abs(remainingDays)} days ago`;
    } else return 'Expires Today';
  }

  onSearch(employeeName: string) {
    if (this.activeTabIndex === 0) {
      if (this.filters[this.filterId].isActive === 'yes') {
        if (employeeName === '')
          this.filterId === 0 ? this.getExpiredVisas() : this.getValidVisas();
        this.getFilteredDocuments('Visa', employeeName, this.filterId);
      } else {
        if (employeeName === '') this.getAllVisas();
        this.getFilteredDocuments('Visa', employeeName, null);
      }
    }
    if (this.activeTabIndex === 1) {
      if (this.filters[this.filterId].isActive === 'yes') {
        if (employeeName === '')
          this.filterId === 0
            ? this.getExpiredPassports()
            : this.getValidPassports();
        this.getFilteredDocuments('Passport', employeeName, this.filterId);
      } else {
        if (employeeName === '') this.getAllPassports();
        this.getFilteredDocuments('Passport', employeeName, null);
      }
    }
    if (this.activeTabIndex === 2) {
      if (employeeName === '') this.getAllIds();
      this.getFilteredDocuments('ID Card', employeeName, null);
    }
  }

  onTabChange(activeTabIndex: number) {
    this.activeTabIndex = activeTabIndex;
    this.currentPage = 1;
    if (this.filters[this.filterId].isActive === 'yes')
      this.filters[this.filterId].isActive = 'no';
    this.updateRequests();
    setTimeout(() => {
      this.currentPage = 1;
    });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.updateRequests();
  }

  getTotalItems() {
    let totalItem = 0;
    if (this.filters[this.filterId].isActive === 'yes') {
      if (this.filterId === 0)
        totalItem = this.totalExpiredItems[this.activeTabIndex];
      else if (this.filterId === 1)
        totalItem = this.totalValidItems[this.activeTabIndex];
    } else {
      totalItem = this.totalItems[this.activeTabIndex];
    }
    return totalItem;
  }

  getFilteredDocuments(
    fileType: string,
    employeeName: string,
    filterId: number | null
  ) {
    this.loaderService.show();

    if (!filterId) {
      this.documentService
        .getDocumentByEmployeeName(fileType, employeeName)
        .subscribe({
          next: (data) => {
            this.loaderService.hide();

            data.forEach((doc: TravelDocuments) => {
              (doc.expiryDate =
                this.datepipe.transform(doc.expiryDate, 'dd/MM/yyyy') || ' '),
                (doc.expiresIn = this.getRemainingDaysMessage(
                  doc.remainingDays
                ));
            });
            this.filteredDocuments = data;
          },
          error: (error: Error) => {
            this.loaderService.hide();
            console.error(error.message);
          },
          complete: () => {
            this.initializeTabs(
              this.filteredDocuments,
              this.filteredDocuments,
              this.filteredDocuments
            );
          },
        });
    } else {
      this.documentService
        .getFilteredDocumentByEmployeeName(fileType, employeeName, filterId)
        .subscribe({
          next: (data) => {
            this.loaderService.hide();
            data.forEach((doc: TravelDocuments) => {
              (doc.expiryDate =
                this.datepipe.transform(doc.expiryDate, 'dd/MM/yyyy') || ' '),
                (doc.expiresIn = this.getRemainingDaysMessage(
                  doc.remainingDays
                ));
            });
            this.filteredDocuments = data;
          },
          error: (error: Error) => {
            this.loaderService.hide();
            console.error(error.message);
          },
          complete: () => {
            this.initializeTabs(
              this.filteredDocuments,
              this.filteredDocuments,
              this.filteredDocuments
            );
          },
        });
    }
  }
}
