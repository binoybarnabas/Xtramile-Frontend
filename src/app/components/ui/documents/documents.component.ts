import { DatePipe } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentsService } from 'src/app/services/documents/documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent {
  form!: FormGroup;
  visaCountryVisible = false;
  expiryDateVisible = false;
  countryData: string[] = [];
  constructor(
    private fb: FormBuilder,
    private documentService: DocumentsService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      documentType: ['', Validators.required],
      country: ['', Validators.required],
      expiryDate: [''],
      documentUpload: [null, Validators.required], // Required validator for file upload
    });

    this.form.get('documentType')?.valueChanges.subscribe((value) => {
      this.visaCountryVisible = value === 'Visa';
      this.expiryDateVisible = value === 'Passport' || value === 'Visa';
      if (this.visaCountryVisible) {
        this.form.get('visaCountry')?.setValidators(Validators.required);
      } else {
        this.form.get('visaCountry')?.clearValidators();
      }
      this.form.get('visaCountry')?.updateValueAndValidity();
    });

    // this.getCountries();
  }

  ngAfterViewInit() {
    this.getCountries();
  }

  searchText: string = '';

  getCountries() {
    this.documentService.getCountries().subscribe({
      next: (data) => {
        this.countryData = data
          .map((country: { name: { common: string } }) => country.name.common)
          .sort();
        console.log(this.countryData);
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  get filteredCountries() {
    if (!this.searchText || this.searchText === '') {
      return this.countryData;
    } else {
      return this.countryData.filter((country: string) =>
        country.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  //submitting the form
  // saveForm() {
  //   if (this.form.valid) {
  //     // Implement save logic here
  //     console.log(this.form.value);


  //     const expiryDate = new Date(
  //       //'Thu Mar 07 2024 10:53:24 GMT+0530 (India Standard Time)'
  //       this.form.value.expiryDate
  //     );

  //     // const formattedDateParts = [
  //     //   expiryDate.toLocaleDateString('en-GB', { day: '2-digit' }),
  //     //   expiryDate.toLocaleDateString('en-GB', { month: '2-digit' }),
  //     //   expiryDate.toLocaleDateString('en-GB', { year: 'numeric' })
  //     // ];
      
  //     const formattedDate = this.datepipe.transform(expiryDate, "yyyy-MM-dd");

  //     console.log(formattedDate);

  //     const userData = localStorage.getItem('userData');
  //     const parsedUserData = userData!== null ? JSON.parse(userData) : '';

  //     const formData = {
  //       UploadedBy:parsedUserData.empId,
  //       TravelDocType:this.form.value.documentType,
  //       ExpiryDate:this.form.value.expiryDate ? formattedDate : '',
  //       Country: this.form.value.country,
  //       File:this.form.value.documentUpload
  //     }
  //     // console.log(formData)

  //     this.documentService.sendDocumentData(formData).subscribe({
  //       next:(response)=>{
  //         console.log(response)
  //       },
  //       error:(error:Error)=>{
  //         console.log(error)
  //       }
  //     })
  //   }
  // }

  saveForm() {
    if (this.form.valid) {
      // Create a new FormData object
      const formData = new FormData();
  
      // Add form fields to the FormData object
      const expiryDate = new Date(this.form.value.expiryDate);
      const formattedDate = this.datepipe.transform(expiryDate, "yyyy-MM-dd") || '';
  
      const userData = localStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : '';
  
      formData.append('UploadedBy', parsedUserData.empId);
      formData.append('TravelDocType', this.form.value.documentType);
      formData.append('ExpiryDate', formattedDate);
      formData.append('Country', this.form.value.country);
      const fileInput = this.form.get('documentUpload');
      if (fileInput && fileInput.value) {
        formData.append('File', fileInput.value);
      }
    
      // Send FormData object to the backend
      this.documentService.sendDocumentData(formData).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error: Error) => {
          console.log(error);
        }
      });
    }
  }
  

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({
      documentUpload: file,
    });
    this.form.get('documentUpload')?.updateValueAndValidity();
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
    this.form.patchValue({
      documentUpload: file,
    });
    this.form.get('documentUpload')?.updateValueAndValidity();
  }

  // Function to trigger file input click when "browse" link is clicked
  clickInput() {
    document.getElementById('documentUpload')?.click();
  }
  
}
