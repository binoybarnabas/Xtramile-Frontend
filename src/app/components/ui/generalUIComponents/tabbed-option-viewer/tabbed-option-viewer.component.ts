import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TextEditorComponent } from '../../text-editor/text-editor.component';
import { ModalComponent } from '../../modal/modal.component';
import { Observable, forkJoin } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { TravelOptionDetails } from 'src/app/services/interfaces/iTravelOptionDetails';
import { ManagerTravelRequestsService } from 'src/app/services/managerServices/travelRequestsServices/manager-travel-requests.service';
import { CustomLoaderService } from 'src/app/services/commonUIServices/custom-loader-service/custom-loader.service';

@Component({
  selector: 'app-tabbed-option-viewer',
  templateUrl: './tabbed-option-viewer.component.html',
  styleUrls: ['./tabbed-option-viewer.component.css']
})
export class TabbedOptionViewerComponent {



  @Input() actionBarTitle : string = "Update Travel Options";  
  @Input() currentLoggedInUserRole : string = 'travelAdmin';
  @Input() requestId : number = -1;
  @Input() requestStatus: string = '';
  @Input() ticketStatus: string = ''
  //fetch from calling component !!!!!!

  isActionBarVisible: boolean = false;
  isDelBtnVisible: boolean = false;
  isAddBtnVisible: boolean = false;

  addBtnTitle : string = 'Add';

  activeTabIndex: number = 0;
  activeTabName : string = 'Files';

  selectedOptionType : string = '';
  selectedOptionId : string = '';

  emptyOptionMessageTitle : string = 'No Options Added Yet!';
  emptyImageOptionMessage : string = 'No Travel Options added as an image. Click on Add to add an option'
  emptyTextOptionMessage : string = 'No Travel Options added as plain text. Click on Add to add an option'


  managerSelectedOptionId : number = -1;
  managerSelectedOptionType : string = '';
  managerSelectedOptionIndex: number = -1;

  travelAdminConfirmedOptionId : number =-1;
  isSelectedOptionChanged: boolean = false;

  bsModalRef!: BsModalRef;
  
  constructor(private modalService: BsModalService, private requestService: RequestService, private managerService:ManagerTravelRequestsService,
    private sanitizer: DomSanitizer, private loaderService : CustomLoaderService
  ){

  }

  ngOnInit(){
    this.initializeComponent();
  }


  initializeComponent(){
    this.getTravelOptionsWithImageByReqId(this.requestId)
    this.getTravelOptionsWithoutImages();
    this.initializeTabs(this.requestStatus, this.currentLoggedInUserRole);
  }

  onTabChange(index: number, tabName:string){
    this.activeTabIndex = index;
    this.activeTabName = tabName;
    this.selectedImageOptionIndex = -1;
    this.selectedTextOptionIndex = -1;
  }

  travelOptionViewerTabs: any = [];
  isOptionViewerActionBarVisible : boolean = false;

  initializeTabs(requestStatus: string , currentLoggedInUserRole: string) {

    let commonTabs = [
      { name: 'Files' },
      { name: 'Texts'}
    ];
    
    let tabsWithSelectedOption = [
      { name: 'Selected Option'},
      { name: 'Files'},
      { name: 'Texts' },
    ];
    
    let tabsWithConfirmedOption = [
      {name : 'Ticket Details'},
      {name: 'Confirmed Option'}
    ];

    let tabsWithLiveTicket = [
      {name : 'Ticket Details'}
    ];
    
    
    if(requestStatus === 'Selected' || requestStatus === 'Ongoing'){
      this.getManagerSelectedOptionIdByRequestId(this.requestId);
    }

    //manager
    if(currentLoggedInUserRole === 'manager') {
      
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
      else if (requestStatus === 'Ongoing') {
        this.travelOptionViewerTabs = tabsWithConfirmedOption;
        this.activeTabName = 'Ticket Details';
      }

      else if(requestStatus === 'Approved by TA' && this.ticketStatus ==='Attached'){
        this.travelOptionViewerTabs = tabsWithLiveTicket;
        this.isActionBarVisible = false;
      }

    } 

    //travel admin
    if(currentLoggedInUserRole === 'travelAdmin'){
      
      this.isActionBarVisible = true;
      this.isDelBtnVisible = true;
      this.isAddBtnVisible = true;

      if(requestStatus === 'Approved by RM'){
        this.travelOptionViewerTabs = commonTabs;
      }

      if(requestStatus === 'Waiting'){
        this.travelOptionViewerTabs = commonTabs;
        this.isActionBarVisible = true;
        this.actionBarTitle = 'Waiting Options';
      }

      else if(requestStatus === 'Selected'){
        this.isActionBarVisible = true;
        this.actionBarTitle = 'Confirm a Travel Option';
        this.travelOptionViewerTabs = tabsWithSelectedOption;
        this.activeTabName = 'Selected Option';
      }
      //approved by ta && ticket status not sent
      else if(requestStatus === 'Approved by TA' && this.ticketStatus === 'Not Attached'){
        this.travelOptionViewerTabs = tabsWithConfirmedOption;
        this.isActionBarVisible = true;
        this.actionBarTitle = 'Upload Ticket' 
        this.addBtnTitle = 'Upload';
        this.activeTabName = 'Ticket Details';
      }

      //TA sent ticket to traveller
      else if(requestStatus === 'Approved by TA' && this.ticketStatus === 'Attached'){
          this.travelOptionViewerTabs = tabsWithLiveTicket;
          this.isActionBarVisible = true;
          this.actionBarTitle = 'Uploaded Ticket'
      }
    
    }

    
  }

  onAddBtnClick(){

    if(this.activeTabName === 'Texts'){
      this.openAddTextOptionModal()
    }

    else if(this.activeTabName === 'Files'){
      this.openAddFileOptionModal()
    }

  }

  //to open modal
  openAddFileOptionModal() {
      const initialState = {
        requestId: this.requestId,
        onImagesSelected: this.addNewTravelOptions.bind(this)
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
  selectedTravelOptionId : number = -1;


  //on options selected
  onOptionSelected(optionType:string, optionIndex: number){

    if(optionType === 'img'){
        
        if(this.selectedImageOptionIndex === optionIndex){

          this.selectedImageOptionIndex = -1;
          this.selectedTravelOptionId = -1;

          //Detecting Option Changes by TA
          if(this.requestStatus === 'Selected'){
            this.travelAdminConfirmedOptionId = this.managerSelectedOptionId;
            this.isSelectedOptionChanged = false;
          }

        }
        else{

          this.selectedImageOptionIndex = optionIndex;
          this.selectedTravelOptionId = this.travelOptionsWithImagesData[optionIndex].optionId;
          
          //Detecting option changes by TA
          if(this.requestStatus === 'Selected' && this.selectedTravelOptionId !== this.managerSelectedOptionId){
            this.travelAdminConfirmedOptionId = this.travelOptionsWithImagesData[optionIndex].optionId;
            this.isSelectedOptionChanged = true;
          }

        }

    }//text options
    else{

      if(this.selectedTextOptionIndex === optionIndex){
        this.selectedTextOptionIndex = -1;
        this.selectedTravelOptionId = -1;

        if(this.requestStatus === 'Selected'){
          this.travelAdminConfirmedOptionId = this.managerSelectedOptionId;
          this.isSelectedOptionChanged = false;
        }
      }
      else{

        this.selectedTextOptionIndex = optionIndex;
        this.selectedTravelOptionId = this.descriptions[optionIndex].optionId;
        
        if(this.requestStatus === 'Selected' && this.selectedTravelOptionId !== this.managerSelectedOptionId){
          this.travelAdminConfirmedOptionId = this.descriptions[optionIndex].optionId;
          this.isSelectedOptionChanged = true;
        }

      }

    }

  }


  //to remove selected option from the array
  deleteSelectedOption(){
    if(this.selectedImageOptionIndex != -1){
      this.removeImage(this.selectedImageOptionIndex);
      this.selectedImageOptionIndex = -1;
    }else{
      this.removeTextOption(this.selectedTextOptionIndex);
      this.selectedTextOptionIndex = -1;
    }
  }

  //Add Text Option
  openAddTextOptionModal(){
      const initialState = {
        requestId: this.requestId,
        textOptions:this.addtextOption.bind(this)
      };
      this.bsModalRef = this.modalService.show(TextEditorComponent, { initialState });
  }

  //deprecated method!!!!
  santizieHtml(html:string):SafeHtml{
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
  }

  removeTextOption(index: number): void {
    if (index > -1) {
      this.textOptions.splice(index, 1);
    }
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
        console.log("Error has occurred, " + error.message);
      },
      complete: () => {
        //console.log("Completed");
        if(this.travelOptionsWithImagesData.length === 0){
          this.emptyImageOptionMessage = 'No Travel options added as image.'
        }
        
      }
    });
  

  }

  receivingOptionId !:number;
  //change array name 
  descriptions!: any[];

  //get text options
  getTravelOptionsWithoutImages(){
    this.loaderService.show();
    this.managerService.getAvailableOptionsDescription(this.requestId).subscribe({
      next: (response: any) =>{
        this.loaderService.hide();
        this.descriptions = response.map((item: { htmlString: SafeHtml; description: string; expanded:boolean; clicked:boolean }) => {
          item.htmlString = this.sanitizer.bypassSecurityTrustHtml(item.description);
          item.expanded = false;
          item.clicked = false; 
          return item;
        });
        this.sortDescriptions();
        
      },
      error: (error: any) => {
        this.loaderService.hide();
        console.error('Post failed:', error);
      },
      complete: () => {
      if(this.descriptions.length === 0) {
        this.emptyTextOptionMessage = 'No Travel options added as plain text'
      }

      
      }
   })
  }


  sortDescriptions(): void {
    if (this.receivingOptionId) {
      const selectedIndex = this.descriptions.findIndex(item => item.optionId === this.receivingOptionId);
      if (selectedIndex !== -1) {
        const selectedOption = this.descriptions.splice(selectedIndex, 1)[0];
        this.descriptions.unshift(selectedOption);
      }
    }
  }



  //To get the id of manager selected option
  //Also used to get the option confirmed by the manager
  //Temporary Solution Need Back End API Fixes
  getManagerSelectedOptionIdByRequestId(requestId : number){

    this.loaderService.show();

    this.requestService.getSelectedTravelOptionDetailsByRequestId(this.requestId).subscribe({
      next: (response: any) =>{
        this.loaderService.hide();
        this.managerSelectedOptionId = response.optionId;
        this.travelAdminConfirmedOptionId = response.optionId;
        //this.managerSelectedOptionType = response.optionFile === null ? 'text' : 'image';
      },
      error: (error: any) => {
        this.loaderService.hide();
      },
      complete: () => {
        
      }
   })

  }










}
