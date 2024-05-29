import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TextEditorComponent } from '../../text-editor/text-editor.component';
import { ModalComponent } from '../../modal/modal.component';
import { Observable, forkJoin } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { TravelOptionDetails } from 'src/app/models/interfaces/iTravelOptionDetails';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { CustomLoaderService } from 'src/app/services/helperServices/commonUIServices/custom-loader-service/custom-loader.service';
import { AddTicketModalComponent } from '../../form-components/add-ticket-modal/add-ticket-modal.component';
import { TravelTicketDetails } from 'src/app/models/dtoModels/travelTicketDetails';
@Component({
  selector: 'app-tabbed-option-viewer',
  templateUrl: './tabbed-option-viewer.component.html',
  styleUrls: ['./tabbed-option-viewer.component.css'],
})
export class TabbedOptionViewerComponent {
  @Input() actionBarTitle: string = 'Update Travel Options';
  @Input() currentLoggedInUserRole: string = 'travelAdmin';
  @Input() requestId: number = -1;
  @Input() requestStatus: string = '';
  @Input() ticketStatus: string = '';

  @Input() tripType : string ='';
  @Input() requestCode: string = '';
  @Input() sourceCity: string = '';
  @Input() destinationCity: string = '';
  @Input() sourceCountry: string = '';
  @Input() destinationCountry: string = '';

  //fetch from calling component !!!!!!

  isActionBarVisible: boolean = false;
  isDelBtnVisible: boolean = false;
  isAddBtnVisible: boolean = false;

  private isSubmitBtnActive: boolean = false;
  @Output() isSubmitBtnActiveChange = new EventEmitter<boolean>();

  addBtnTitle: string = 'Upload';

  activeTabIndex: number = 0;
  activeTabName: string = 'Files';

  selectedOptionType: string = '';
  selectedOptionId: string = '';

  emptyOptionMessageTitle: string = 'No Options Added Yet!';
  emptyImageOptionMessage: string =
    'No Travel Options added as an image. Click on Add to add an option';
  emptyTextOptionMessage: string =
    'No Travel Options added as plain text. Click on Add to add an option';

  noTicketMessageTitle : string = 'No Tickets Added!';
  noTicketMessageDescription : string = 'No Tickets Added yet. Click on Upload button to add ticket';

  managerSelectedOptionId: number = -1;
  managerSelectedOptionType: string = '';
  managerSelectedOptionIndex: number = -1;

  travelAdminConfirmedOptionId: number = -1;
  isSelectedOptionChanged: boolean = false;

  bsModalRef!: BsModalRef;
  
  //To Keep Ticket Files When TA Adds them
  ticketFiles: {ticketFile: File, description: string }[] = [];

  //To Store Ticket Files Received from API
  // receivedTicketFiles : {ticketFile : File, description: string} [] = [];
  // receivedTicketFileUrls: string[] = [];


  constructor(
    private modalService: BsModalService,
    private requestService: RequestService,
    private managerService: ManagerTravelRequestsService,
    private sanitizer: DomSanitizer,
    private loaderService: CustomLoaderService
  ) {}

  ngOnInit() {
    this.initializeComponent();
  }

  initializeComponent() {
    this.getTravelOptionsWithImageByReqId(this.requestId);
    this.getTravelOptionsWithoutImages();
    this.initializeTabs(this.requestStatus, this.currentLoggedInUserRole);
    this.getTravelTicketDetails(this.requestId);
  }

  onTabChange(index: number, tabName: string) {
    this.activeTabIndex = index;
    this.activeTabName = tabName;
    this.selectedImageOptionIndex = -1;
    this.selectedTextOptionIndex = -1;
  }

  travelOptionViewerTabs: any = [];
  isOptionViewerActionBarVisible: boolean = false;

  initializeTabs(requestStatus: string, currentLoggedInUserRole: string) {
    let commonTabs = [{ name: 'Files' }, { name: 'Texts' }];

    let tabsWithSelectedOption = [
      { name: 'Selected Option' },
      { name: 'Files' },
      { name: 'Texts' },
    ];

    let tabsWithConfirmedOption = [
      { name: 'Ticket Details' },
      { name: 'Confirmed Option' },
    ];

    let tabsWithLiveTicket = [{ name: 'Ticket Details' }];

    if (requestStatus === 'Selected' || requestStatus === 'Approved by TA') {
      this.getManagerSelectedOptionIdByRequestId(this.requestId);
    }

    //manager
    if (currentLoggedInUserRole === 'manager') {
      if (requestStatus === 'Waiting') {
        this.travelOptionViewerTabs = commonTabs;
        this.isActionBarVisible = true;
        this.actionBarTitle = 'Choose a Travel Option';
      }
      else if (requestStatus === 'Selected') {
        this.isActionBarVisible = true;
        this.actionBarTitle = 'Selected Travel Option';
        this.travelOptionViewerTabs = tabsWithSelectedOption;
        this.activeTabName = 'Selected Option';
      }
      //change status to Approved by TA
      else if (
        requestStatus === 'Approved by TA' &&
        this.ticketStatus === 'Not Attached'
      ) {
        this.travelOptionViewerTabs = tabsWithConfirmedOption;
        this.activeTabName = 'Ticket Details';
        this.noTicketMessageDescription = 'Ticket information is currently unavailable. Please check back later or contact your travel admin.'
      } 

      else if (
        requestStatus === 'Approved by TA' &&
        this.ticketStatus === 'Attached'
      ) {
        this.activeTabName = 'Ticket Details'
        this.travelOptionViewerTabs = tabsWithLiveTicket;
        this.isActionBarVisible = true;
      }
    }

    //travel admin
    if (currentLoggedInUserRole === 'travelAdmin') {
      this.isActionBarVisible = true;
      this.isDelBtnVisible = true;
      this.isAddBtnVisible = true;

      if (requestStatus === 'Approved by RM') {
        this.travelOptionViewerTabs = commonTabs;
      }

      if (requestStatus === 'Waiting') {
        this.travelOptionViewerTabs = commonTabs;
        this.isActionBarVisible = true;
        this.actionBarTitle = 'Waiting Options';
      } else if (requestStatus === 'Selected') {
        this.isActionBarVisible = true;
        this.actionBarTitle = 'Confirm a Travel Option';
        this.travelOptionViewerTabs = tabsWithSelectedOption;
        this.activeTabName = 'Selected Option';
      }
      //approved by ta && ticket status not sent
      else if (
        requestStatus === 'Approved by TA' &&
        this.ticketStatus === 'Not Attached'
      ) {
        this.travelOptionViewerTabs = tabsWithConfirmedOption;
        this.isActionBarVisible = true;
        this.actionBarTitle = 'Upload Ticket';
        this.addBtnTitle = 'Upload';
        this.activeTabName = 'Ticket Details';
      }

      //TA sent ticket to traveller
      else if (
        requestStatus === 'Approved by TA' &&
        this.ticketStatus === 'Attached'
      ) {
        this.travelOptionViewerTabs = tabsWithLiveTicket;
        this.isActionBarVisible = true;
        this.actionBarTitle = 'Ticket Details'
        this.activeTabName = 'Ticket Details'
      }
    }
  }

  onAddBtnClick() {
    //Add Ticket
    if (
      this.currentLoggedInUserRole === 'travelAdmin' &&
      this.ticketStatus === 'Not Attached' &&
      this.requestStatus === 'Approved by TA'
    ) {
      this.openAddTicketModal();
    }

    if (this.activeTabName === 'Texts') {
      this.openAddTextOptionModal();
    } else if (this.activeTabName === 'Files') {
      this.openAddFileOptionModal();
    }
  }

  //to open modal
  openAddTicketModal() {
    const initialState = {
      requestId: this.requestId,
      tripType : this.tripType,
      onTicketFileSelected: this.addTravelTicket.bind(this),
    };
    this.bsModalRef = this.modalService.show(AddTicketModalComponent, {
      initialState,
    });
  }

  //Stores Image File Temporarily
  ticketFileUrls: string[] = [];

  //to add image options
  addTravelTicket(ticket: File, description: string): void {

    this.ticketFiles.push({ticketFile: ticket, description: description})

    this.isAnyOptionArrayPopulated();

    this.getImageUrl(ticket).subscribe((url: string) => {
      this.ticketFileUrls.push(url);
    })
  }

  //isTicketFileSelected : boolean = false;
  selectedTicketFileIndex: number = -1;

  onTicketFileSelected(fileIndex: number) {
    if (this.selectedTicketFileIndex === fileIndex) {
      this.selectedTicketFileIndex = -1;
      return;
    }
    this.selectedTicketFileIndex = fileIndex;
  }


  //to remove images from the array
  removeTicketFromArray(index: number): void {
    if (index >= 0 && index < this.ticketFiles.length) {
      this.ticketFiles.splice(index, 1);
      this.ticketFileUrls.splice(index, 1);
    }
    this.selectedTicketFileIndex = -1;
  }


  travelTicketDetails: TravelTicketDetails[] = [];
  //getTickets From API
  getTravelTicketDetails(requestId : number){
    this.loaderService.show();

    this.requestService.getTravelTicketDetailsByReqId(requestId).subscribe({
      next: (data) => {
        //this.loaderService.hide();
        this.travelTicketDetails = data;
      },
      error: (error: Error) => {
        this.loaderService.hide();
        console.log('Error has occurred, ' + error.message);
      },
      complete: () => {
        //console.log("Completed");
        // if (this.travelOptionsWithImagesData.length === 0) {
        //   this.emptyImageOptionMessage = 'No Travel options added as image.';
        // }
        console.log(this.travelTicketDetails);
      },
    });
  }



  //to open modal
  openAddFileOptionModal() {
    const initialState = {
      requestId: this.requestId,
      onImagesSelected: this.addNewTravelOptions.bind(this),
    };
    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
  }

  //Stores Image File Temporarily
  addedImageFiles: File[] = [];
  optionImageUrls: string[] = [];
  fileOptionDescriptions: string[] = [];

  //to add image options
  addNewTravelOptions(images: File[], description: string): void {
    this.addedImageFiles = [...this.addedImageFiles, ...images];
    this.fileOptionDescriptions.push(description);

    this.isAnyOptionArrayPopulated();

    const observables = images.map((image) => this.getImageUrl(image));

    forkJoin(observables).subscribe((urls: string[]) => {
      this.optionImageUrls = [...this.optionImageUrls, ...urls];
    });
  }

  //extracting img url
  getImageUrl(image: File): Observable<string> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const dataUrl = event.target?.result as string;
        observer.next(dataUrl);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsDataURL(image);
    });
  }

  isImageViewerOpen: boolean = false;

  //to remove images from the array
  removeImage(index: number): void {
    if (index >= 0 && index < this.addedImageFiles.length) {
      this.addedImageFiles.splice(index, 1);
      this.optionImageUrls.splice(index, 1);
      this.fileOptionDescriptions.splice(index, 1);
    }
  }

  selectedImageOptionIndex: number = -1;
  selectedTextOptionIndex: number = -1;

  //to get the id of the selected option/ option chosen by manager
  //change name to ClickedOptionId
  selectedTravelOptionId: number = -1;

  //on options selected
  onOptionSelected(optionType: string, optionIndex: number) {
    if (optionType === 'img') {
      if (this.selectedImageOptionIndex === optionIndex) {
        this.selectedImageOptionIndex = -1;
        this.selectedTravelOptionId = -1;
        this.isSubmitBtnActive = false;
        //Detecting Option Changes by TA
        if (this.requestStatus === 'Selected') {
          this.travelAdminConfirmedOptionId = this.managerSelectedOptionId;
          this.isSelectedOptionChanged = false;
        }
      } else {
        this.selectedImageOptionIndex = optionIndex;
        this.selectedTravelOptionId =
          this.travelOptionsWithImagesData[optionIndex].optionId;
        this.isSubmitBtnActive = true;

        //Detecting option changes by TA
        if (
          this.requestStatus === 'Selected' &&
          this.selectedTravelOptionId !== this.managerSelectedOptionId
        ) {
          this.travelAdminConfirmedOptionId =
            this.travelOptionsWithImagesData[optionIndex].optionId;
          this.isSelectedOptionChanged = true;
        }
      }
    } //text options
    else {
      if (this.selectedTextOptionIndex === optionIndex) {
        this.selectedTextOptionIndex = -1;
        this.selectedTravelOptionId = -1;
        this.isSubmitBtnActive = false;

        if (this.requestStatus === 'Selected') {
          this.travelAdminConfirmedOptionId = this.managerSelectedOptionId;
          this.isSelectedOptionChanged = false;
        }
      } else {
        this.selectedTextOptionIndex = optionIndex;
        this.selectedTravelOptionId = this.descriptions[optionIndex].optionId;
        this.isSubmitBtnActive = true;

        if (
          this.requestStatus === 'Selected' &&
          this.selectedTravelOptionId !== this.managerSelectedOptionId
        ) {
          this.travelAdminConfirmedOptionId =
            this.descriptions[optionIndex].optionId;
          this.isSelectedOptionChanged = true;
        }
      }
    }
    this.isSubmitBtnActiveChange.emit(this.isSubmitBtnActive);
  }

  //to remove selected option from the array
  deleteSelectedOption() {
    if (
      this.requestStatus === 'Approved by TA' &&
      this.ticketStatus === 'Not Attached'
    ) {
      this.removeTicketFromArray(this.selectedTicketFileIndex);
    }

    if (this.selectedImageOptionIndex != -1) {
      this.removeImage(this.selectedImageOptionIndex);
      this.selectedImageOptionIndex = -1;
    } else {
      this.removeTextOption(this.selectedTextOptionIndex);
      this.selectedTextOptionIndex = -1;
    }

    this.isAnyOptionArrayPopulated();
  }

  //Add Text Option
  openAddTextOptionModal() {
    const initialState = {
      requestId: this.requestId,
      textOptions: this.addtextOption.bind(this),
    };
    this.bsModalRef = this.modalService.show(TextEditorComponent, {
      initialState,
    });
  }

  //deprecated method!!!!
  santizieHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  panelOpenState: boolean[] = [];

  togglePanel(index: number): void {
    this.panelOpenState[index] = !this.panelOpenState[index];
  }

  isPanelOpen(index: number): boolean {
    return this.panelOpenState[index] || false;
  }

  textOptions: string[] = [];

  addtextOption(textOption: string): void {
    this.textOptions.push(textOption);
    this.isAnyOptionArrayPopulated();
  }

  removeTextOption(index: number): void {
    if (index > -1) {
      this.textOptions.splice(index, 1);
    }
  }

  //to check if images and texts option array are empty
  //also used with tickets
  //to disable submit btn
  isAnyOptionArrayPopulated() {
    this.isSubmitBtnActive =
      this.textOptions.length !== 0 || this.addedImageFiles.length !== 0 || this.ticketFiles.length !==0
        ? true
        : false;
    this.isSubmitBtnActiveChange.emit(this.isSubmitBtnActive);
  }

  value?: string;

  openImageViewer() {
    this.isImageViewerOpen = true;
  }

  closeImageViewer() {
    this.isImageViewerOpen = false;
  }

  travelOptionsWithImagesData: TravelOptionDetails[] = [];

  //get uploaded travel options with images
  getTravelOptionsWithImageByReqId(reqId: number) {
    this.loaderService.show();

    this.requestService.getTravelOptionsByReqId(reqId).subscribe({
      next: (data) => {
        this.loaderService.hide();
        this.travelOptionsWithImagesData = data;
      },
      error: (error: Error) => {
        this.loaderService.hide();
        console.log('Error has occurred, ' + error.message);
      },
      complete: () => {
        //console.log("Completed");
        if (this.travelOptionsWithImagesData.length === 0) {
          this.emptyImageOptionMessage = 'No Travel options added as image.';
        }
      },
    });
  }

  receivingOptionId!: number;
  //change array name
  descriptions!: any[];

  //get text options
  getTravelOptionsWithoutImages() {
    this.loaderService.show();
    this.managerService
      .getAvailableOptionsDescription(this.requestId)
      .subscribe({
        next: (response: any) => {
          this.loaderService.hide();
          this.descriptions = response.map(
            (item: {
              htmlString: SafeHtml;
              description: string;
              expanded: boolean;
              clicked: boolean;
            }) => {
              item.htmlString = this.sanitizer.bypassSecurityTrustHtml(
                item.description
              );
              item.expanded = false;
              item.clicked = false;
              return item;
            }
          );
          this.sortDescriptions();
        },
        error: (error: any) => {
          this.loaderService.hide();
          console.error('Post failed:', error);
        },
        complete: () => {
          if (this.descriptions.length === 0) {
            this.emptyTextOptionMessage =
              'No Travel options added as plain text';
          }
        },
      });
  }

  sortDescriptions(): void {
    if (this.receivingOptionId) {
      const selectedIndex = this.descriptions.findIndex(
        (item) => item.optionId === this.receivingOptionId
      );
      if (selectedIndex !== -1) {
        const selectedOption = this.descriptions.splice(selectedIndex, 1)[0];
        this.descriptions.unshift(selectedOption);
      }
    }
  }

  //To get the id of manager selected option
  //Also used to get the option confirmed by the manager
  //Temporary Solution Need Back End API Fixes
  getManagerSelectedOptionIdByRequestId(requestId: number) {
    this.loaderService.show();

    this.requestService
      .getSelectedTravelOptionDetailsByRequestId(this.requestId)
      .subscribe({
        next: (response: any) => {
          this.loaderService.hide();
          this.managerSelectedOptionId = response.optionId;
          this.travelAdminConfirmedOptionId = response.optionId;
          //this.managerSelectedOptionType = response.optionFile === null ? 'text' : 'image';
        },
        error: (error: any) => {
          this.loaderService.hide();
        },
        complete: () => {},
      });
  }
}
