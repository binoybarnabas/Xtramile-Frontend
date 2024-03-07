import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { countries } from 'src/app/services/commonAPIServices/countries';
@Component({
  selector: 'app-traveller-documents',
  templateUrl: './traveller-documents.component.html',
  styleUrls: ['./traveller-documents.component.css']
})
export class TravellerDocumentsComponent {

  isDocUploadModalOpen: boolean;
  selectedDocType: string;

  countryList = countries;

  documentUploadForm!: FormGroup;
  visaCountryVisible = false;
  expiryDateVisible = false;
  countryData: string[] = [];

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentsService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.isDocUploadModalOpen = false;
    this.selectedDocType = 'idCard'
  }


  ngOnInit(): void {
    this.documentUploadForm = this.fb.group({
      // documentType: ['', Validators.required],
      docNumber: ['', Validators.required],
      country: ['', Validators.required],
      expiryDate: ['', Validators.nullValidator],
      documentFile: [null, Validators.required], // Required validator for file upload
    });


    // this.form.get('documentType')?.valueChanges.subscribe((value) => {
    //   this.visaCountryVisible = value === 'visa';
    //   this.expiryDateVisible = value === 'passport' || value === 'visa';
    //   if (this.visaCountryVisible) {
    //     this.form.get('visaCountry')?.setValidators(Validators.required);
    //   } else {
    //     this.form.get('visaCountry')?.clearValidators();
    //   }
    //   this.form.get('visaCountry')?.updateValueAndValidity();
    // });

    // this.getCountries();
  }


  // ngAfterViewInit() {
  //   this.getCountries();
  // }

  // searchText: string = '';

  // getCountries() {
  //   this.documentService.getCountries().subscribe({
  //     next: (data) => {
  //       this.countryData = data
  //         .map((country: { name: { common: string } }) => country.name.common)
  //         .sort();
  //       console.log(this.countryData);
  //     },
  //     error: (error: Error) => {
  //       console.log(error);
  //     },
  //   });
  // }

  // get filteredCountries() {
  //   if (!this.searchText || this.searchText === '') {
  //     return this.countryData;
  //   } else {
  //     return this.countryData.filter((country: string) =>
  //       country.toLowerCase().includes(this.searchText.toLowerCase())
  //     );
  //   }
  // }

  //submitting the form
  saveForm() {
    if (this.documentUploadForm.valid) {
      // Implement save logic here
      console.log(this.documentUploadForm.value);

      const expiryDate = new Date(
        //'Thu Mar 07 2024 10:53:24 GMT+0530 (India Standard Time)'
        this.documentUploadForm.value.expiryDate
      );

      const formattedDateParts = [
        expiryDate.toLocaleDateString('en-GB', { year: 'numeric' }),
        expiryDate.toLocaleDateString('en-GB', { month: '2-digit' }),
        expiryDate.toLocaleDateString('en-GB', { day: '2-digit' })
      ];

      const formattedDate = formattedDateParts.join('-');

      console.log(formattedDate);

      const userData = localStorage.getItem('userData');
      const parsedUserData = userData !== null ? JSON.parse(userData) : '';

      const formData = {
        UploadedBy: parsedUserData.empId,
        TravelDocType: this.selectedDocType,
        DocId: this.documentUploadForm.value.docNumber,
        ExpiryDate: this.documentUploadForm.value.expiryDate ? formattedDate : '',
        Country: this.documentUploadForm.value.country,
        File: this.documentUploadForm.value.documentFile
      }

      console.log(formData)
      this.documentService.sendDocumentData(formData).subscribe({
        next: (response) => {
          this.toggleDocUploadModal(false);
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
    this.documentUploadForm.patchValue({
      documentFile: file,
    });
    this.documentUploadForm.get('documentFile')?.updateValueAndValidity();
  }

  // Function to trigger file input click when "browse" link is clicked
  clickInput() {
    document.getElementById('documentFile')?.click();
  }


  //modal controller
  toggleDocUploadModal(toggleValue: boolean) {
    this.isDocUploadModalOpen = toggleValue;
  }

  //doc type controller
  changeDocType(newDocType: string) {
    this.selectedDocType = newDocType;
  }



}
