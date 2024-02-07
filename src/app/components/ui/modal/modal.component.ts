import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input()
  set requestId(value: number) {
    this._requestId = value;
  if (this.optionForm) {
    this.optionForm.get('requestId')?.setValue(value);
    }
  }
  get requestId(): number {
    return this._requestId;
  }
  private _requestId!: number;
  optionForm: FormGroup;
  travelModes: any[] = [];
  categoryData : any[] =[];
  

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private travelAdminService: TravelAdminTravelRequestsService) {
    this.optionForm = this.formBuilder.group({
      description: [''],
      class: ['', Validators.required],
      serviceOfferedBy: ['', Validators.required],
      startTime: ['',[Validators.required, this.dateNotBeforeTodayValidator()]],
      endTime: [{ value: '', disabled: true }, [Validators.required, this.endTimeAfterStartTimeValidator('startTime')]],
      requestId: [this._requestId, Validators.required],
      categoryId: [, Validators.required],
      travelMode : ['', Validators.required],
    });
    //to enable endtime according to starttime by subscribing to value changes of startime
    this.optionForm.get('startTime')?.valueChanges.subscribe((startTime) => {
      const endTimeControl = this.optionForm.get('endTime');
      if (startTime) {
        // Enable the end time control
        endTimeControl?.enable();
      } else {
        // Disable and clear the end time control
        endTimeControl?.disable();
        endTimeControl?.setValue('');
      }
    });
  }

  ngOnInit(){
    //ApiService to get travel modes
    this.travelAdminService.getTravelModes().subscribe({
      next: (data:any)=>{
        this.travelModes = data;
        console.log(this.travelModes)
      },
      error: (error: Error) => {
        alert('Error has occurred' + error.message);
      },
      complete: () => {
        console.log('Completed fetching data')
      }
    });
    
    //ApiService to get categories
    this.travelAdminService.getCategory().subscribe({
      next: (data:any)=>{
        this.categoryData = data;
      },
      error: (error : Error) =>{
        alert('Error has occurred' + error.message);
      },
      complete: () => {
        console.log('Completed fetching data')
      }
    })
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  //On submitting modal pass body to apiservice
  submitModal() {
    if(this.optionForm.valid&&this.optionForm.touched&&this.optionForm.dirty)
    {
    if (this.optionForm.valid) {
      const formData = this.optionForm.value;
      formData.modeId = this.optionForm.get('travelMode')?.value;
      formData.categoryId = this.optionForm.get('categoryId')?.value;
      // Call the API service to post the form data
      this.travelAdminService.postAvailOptionData(formData).subscribe({
        next: (response) => {
          console.log('Data posted successfully', response);
          // You can handle success here
          alert('The option have been added successfully')
          this.bsModalRef.hide();
        },
        error: (error) => {
          console.error('Error posting data', error);
          // You can handle error here
        },
        complete: () => {
          console.log('Post request completed.');
          // You can perform any additional actions after the request is completed
        },
      });
    }
    }
    else
    alert('Please enter the details!!');
  }
  //Validation to check if endtime is lesser than the start time.
  endTimeAfterStartTimeValidator(startTimeControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const startTime = control.root.get(startTimeControlName)?.value;
        const endTime = control.value;
    
        if (startTime && endTime) {
          const startDate = new Date(startTime);
          const endDate = new Date(endTime);
    
          if (startDate >= endDate) {
            return { endTimeAfterStartTime: true };
          }
        }
      return null;
    };
  }
  
  //validation for not taking a date before today as input
  dateNotBeforeTodayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
  
      if (selectedDate < currentDate) {
        return { dateNotBeforeToday: true };
      }
  
      return null;
    };
  
  }
}
