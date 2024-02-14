import { Component, Input } from '@angular/core';
// import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent {

  private _requestId!: number;

  @Input()
  set requestId(value: number) {

    this._requestId = value;
    console.log(this._requestId)
    if (this.travelOptionForm) {
      this.travelOptionForm.get('requestId')?.setValue(value);
    }
  }


  travelOptionForm!: FormGroup;

  constructor(public bsModalRef: BsModalRef, private travelAdminRequestService: TravelAdminTravelRequestsService,
  ) {

  }


  ngOnInit() {

    this.travelOptionForm = new FormGroup({

      optionFile: new FormControl(Validators.required),
      requestId: new FormControl(this._requestId, Validators.nullValidator),
      description: new FormControl('', Validators.required)

    });


  }

  closeModal() {
    this.bsModalRef.hide();

  }


  imageValidator(control: FormControl) {
    const value = control.value;
    if (typeof value === 'string' && value.startsWith('data:image/')) {
      return null; // Valid
    }
    return { invalidImage: true }; // Invalid
  }

  previewImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.travelOptionForm.patchValue({
          optionFile: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }


  //Submit Travel Option
  // addNewTravelOption() {

  //   console.log("Form Values");
  //   console.log(this.travelOptionForm.value);

  //   this.travelAdminRequestService.addNewTravelOption(this.travelOptionForm.value).subscribe({
  //     next: (response) => {
  //       console.log(response)
  //       alert("Travel Option Added!")
  //       this.closeModal()
  //       // this.router.navigate(['employee/pending']);
  //     },
  //     error: (error: Error) => {
  //       alert("Error has occured" + error.message);
  //     },
  //     complete: () => {
  //       console.log("COMPLETED");
  //     }
  //   });


  // }

  //Test mode
  addNewTravelOption() {
    const formData = new FormData();
    const file = this.travelOptionForm.get('optionFile')?.value;
    formData.append('optionFile', file);
    formData.append('requestId', String(this._requestId));
    formData.append('description', this.travelOptionForm.get('description')?.value);

    this.travelAdminRequestService.addNewTravelOption(formData).subscribe({
      next: (response) => {
        console.log(response);
        alert("Travel Option Added!");
        this.closeModal();
      },
      error: (error: Error) => {
        alert("Error has occurred" + error.message);
      },
      complete: () => {
        console.log("COMPLETED");
      }
    });
  }

  //Handling File Changes
  onFileChange(event: any, controlName: string): void {
    // const file = (event.target as HTMLInputElement).files?.[0];
    const file = event.target.files[0];
    this.travelOptionForm.get(controlName)?.setValue(file);
    this.travelOptionForm.get(controlName)?.updateValueAndValidity();
    console.log('Form Validity:', this.travelOptionForm.valid);
  }


}
