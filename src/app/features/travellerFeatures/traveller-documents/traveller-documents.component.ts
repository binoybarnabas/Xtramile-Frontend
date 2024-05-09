import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { countries } from 'src/app/services/commonAPIServices/countries';
import { DatePipe } from '@angular/common';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { ConfirmationModalComponent } from 'src/app/components/ui/travel-request-card/confirmation-modal/confirmation-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomConfirmationModalComponent } from 'src/app/components/ui/generalUIComponents/custom-confirmation-modal/custom-confirmation-modal.component';
import { docCategories } from 'src/app/services/commonAPIServices/docCategories';
@Component({
  selector: 'app-traveller-documents',
  templateUrl: './traveller-documents.component.html',
  styleUrls: ['./traveller-documents.component.css']
})
export class TravellerDocumentsComponent {

  isDocUploadModalOpen: boolean;
  selectedDocType: string;

  countryList = countries;

  docCategoryList = docCategories;

  pageHeading = 'My Documents'

  documentUploadForm!: FormGroup;
  visaCountryVisible = false;
  expiryDateVisible = false;
  countryData: string[] = [];
  fileErrorMessage: string = '';

  isPdfViewerOpen: boolean = false;
  loadedFileUrl : string = '';


  forwardBtnText : string = 'Add';


  bsModalRef!: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentsService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private datepipe: DatePipe,
    private commonService:CommonAPIService,
    private modalService: BsModalService,
  ) {
    this.isDocUploadModalOpen = false;
    this.selectedDocType = 'ID Card'
  }


  ngOnInit(): void {
    this.documentUploadForm = this.fb.group({
      // documentType: ['', Validators.required],
      docNumber: ['', Validators.required],
      docCategory: ['', Validators.required],
      country: ['', Validators.required],
      expiryDate: ['', Validators.nullValidator],
      documentFile: [null, Validators.required], // Required validator for file upload
    });
    this.commonService.setIsFile(false);
  }


  //submitting the form
  saveForm() {
    if (this.documentUploadForm.valid) {
      // Implement save logic here
      const formData = new FormData();

      const expiryDate: Date | null = this.documentUploadForm.value.expiryDate ? new Date(this.documentUploadForm.value.expiryDate) : null;
      
      let formattedDate: string | null = null;
      if (expiryDate) {
        formattedDate = this.datepipe.transform(expiryDate, 'yyyy-MM-dd');
      }

      const userData = localStorage.getItem('userData');
      const parsedUserData = userData !== null ? JSON.parse(userData) : '';

      formData.append('UploadedBy', parsedUserData.empId);
      formData.append('TravelDocType', this.selectedDocType);
      if(formattedDate)
        formData.append('ExpiryDate', formattedDate);
      formData.append('Country', this.documentUploadForm.value.country);
      formData.append('DocId', this.documentUploadForm.value.docNumber)
      const fileInput = this.documentUploadForm.get('documentFile');
      if (fileInput && fileInput.value) {
        formData.append('File', fileInput.value);
        formData.append('Size', fileInput.value.size);
      }

    this.documentService.sendDocumentData(formData).subscribe({
      next: (response) => {
        this.isDocUploadModalOpen = false;
        this.commonService.setIsFile(true);
        console.log(response)
      },
      error: (error: Error) => {
        console.log(error)
      }
    });
  }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    // if(file.type !== 'application/pdf'){
    //   event.target.value = '';
    //   this.documentUploadForm.get('documentFile')?.setValue('');
    //   this.fileErrorMessage = "* Select a PDF File";
    //   return;
    // }
    // this.fileErrorMessage = ''
    this.documentUploadForm.patchValue({
      documentFile: file,
    });
    this.documentUploadForm.get('documentFile')?.updateValueAndValidity();
  }

  // Custom validator function for expiry date
  expiryDateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    return selectedDate > today ? null : { futureDate: true };
  }

  // Drag and drop methods
  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragEnter(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.renderer.addClass(this.elementRef.nativeElement, 'drag-over');
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.renderer.removeClass(this.elementRef.nativeElement, 'drag-over');
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    // if(file.type !== 'application/pdf'){
    //   event.dataTransfer.value = '';
    //   this.documentUploadForm.get('documentFile')?.setValue('');
    //   this.fileErrorMessage = "* Select a PDF File";
    //   return;
    // }
    // this.fileErrorMessage = ''
    this.documentUploadForm.patchValue({
      documentFile: file,
    });
    this.documentUploadForm.get('documentFile')?.updateValueAndValidity();
  }

  // Function to trigger file input click when "browse" link is clicked
  clickInput() {
    document.getElementById('documentFile')?.click();
  }


  //Using the same button to open the form and later to save the form
  onForwardBtnClick(){
    //if form is not visible then open the form
    if(!this.isDocUploadModalOpen){
      this.isDocUploadModalOpen = true;
      this.pageHeading = 'Upload Travel Documents'
      this.forwardBtnText = 'Save';
    }else{
      //if form is visible then clicking the save button should save the form
      this.saveForm();
      //after the method call the page heading should be back to My Docs
      //and button text should be Add - with the behaviour being changed to open the form
      this.pageHeading = 'My Documents'
      this.forwardBtnText = 'Add';
    }
  }

  //cancel modal
  onCancelBtnClick(){
    this.isDocUploadModalOpen = false;
    this.pageHeading = 'My Documents';
    this.forwardBtnText = 'Add';
  }

  //doc type controller
  changeDocType(newDocType: string) {
    this.selectedDocType = newDocType;
  }

  onDeleteBtnClick(){

 
    this.bsModalRef = this.modalService.show(CustomConfirmationModalComponent, {} );
    this.bsModalRef.content.onClose.subscribe((result: any) => {
      // Handle the result from the modal if needed
      // You can perform actions with the result data here
    });
  }

  openPdfViewer(fileUrl: string) {
    this.loadedFileUrl = fileUrl;
    this.isPdfViewerOpen = true;
  }

  closePdfViewer() {
   this.isPdfViewerOpen = false;
   //this.initializeComponent();
  }


}