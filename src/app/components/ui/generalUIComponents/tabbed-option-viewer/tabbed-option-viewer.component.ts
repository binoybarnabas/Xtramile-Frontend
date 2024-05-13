import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TextEditorComponent } from '../../text-editor/text-editor.component';
import { ModalComponent } from '../../modal/modal.component';
import { Observable, forkJoin } from 'rxjs';
import { CustomToastService } from 'src/app/services/toastServices/custom-toast.service';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tabbed-option-viewer',
  templateUrl: './tabbed-option-viewer.component.html',
  styleUrls: ['./tabbed-option-viewer.component.css']
})
export class TabbedOptionViewerComponent {

  //@Input() isDelBtnVisible: boolean = false;
  //@Input() isAddBtnVisible: boolean = false;

  @Input() actionBarTitle : string = "Update Travel Options";  
  @Input() currentLoggedInUserRole : string = 'travelAdmin';
  @Input() requestId : number = -1;
  @Input() requestStatus: string = 'Forwarded';
  //fetch from calling component !!!!!!

  isActionBarVisible: boolean = false;
  activeTabIndex: number = 0;
  activeTabName : string = 'Files';

  selectedOptionType : string = '';
  selectedOptionId : string = '';

  emptyOptionMessageTitle : string = 'No Options Added Yet!';
  emptyImageOptionMessage : string = 'No Travel Options added as an image. Click on Add to add an option'
  emptyTextOptionMessage : string = 'No Travel Options added as in the plain text form. Click on Add to add an option'


  bsModalRef!: BsModalRef;

  constructor(private modalService: BsModalService,
    private sanitizer: DomSanitizer
  ){

  }

  ngOnInit(){
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
      { name: 'Confirmed Option' }
    ];
    
    if(currentLoggedInUserRole === 'Manager' || currentLoggedInUserRole === 'travelAdmin') {

      if (requestStatus === 'Waiting' || requestStatus === 'Forwarded') {
        this.travelOptionViewerTabs = commonTabs;
      } else if (requestStatus === 'Selected') {
        this.travelOptionViewerTabs = tabsWithSelectedOption;
      } else if (requestStatus === 'Approved') {
        this.travelOptionViewerTabs = tabsWithConfirmedOption;
      }

    } 
    if(currentLoggedInUserRole === 'travelAdmin' && requestStatus === 'Forwarded' ){
      this.isActionBarVisible = true;
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

  //on options selected
  onOptionSelected(optionType:string, optionIndex: number){

    if(optionType === 'img'){
        
        if(this.selectedImageOptionIndex === optionIndex){
          this.selectedImageOptionIndex = -1;
        }else{
          this.selectedImageOptionIndex = optionIndex;
        }

    }else{
      if(this.selectedTextOptionIndex === optionIndex){
        this.selectedTextOptionIndex = -1;
      }else{
        this.selectedTextOptionIndex = optionIndex;
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

  //Deletion of Options
  selectedOptionIds: number[] = [];

  toggleOptionSelection(item: any) {
      const index = this.selectedOptionIds.indexOf(item.optionId);
      if (index === -1) {
          this.selectedOptionIds.push(item.optionId);
      } else {
          this.selectedOptionIds.splice(index, 1);
      }
  }
  
  isSelected(item: any): boolean {
      return this.selectedOptionIds.includes(item.optionId);
  }
  
  // deleteSelectedOptions() {
  //     // Call your service method to delete selected option IDs
  //     this.requestService.deleteOptions(this.selectedOptionIds).subscribe({
  //         next: () => {
  //             console.log("Selected options deleted successfully.");
  //             // Clear the selectedOptionIds array
  //             this.selectedOptionIds = [];
  //             this.commonApiService.setIsFile(true);
  //         },
  //         error: (error: Error) => {
  //             console.log("Error deleting selected options: " + error.message);
  //         }
  //     });
  // }


  value?: string;

  openImageViewer() {
    this.isImageViewerOpen = true;
  }

  closeImageViewer() {
   this.isImageViewerOpen = false;
  }


}
