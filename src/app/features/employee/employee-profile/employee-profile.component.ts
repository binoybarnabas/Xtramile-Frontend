import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ProfileService } from 'src/app/services/employeeServices/profileServices/profile.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent {
  editMode: boolean = false;
  employeeId!: number;
  initialValue: { [key: string]: any } = {}; //to store the initial value of contact and address
  initialData: { [key: string]: any } = {}; // to store the initial value of all other data
 
  profileImage: string | null = null;
  newImageSelected: boolean = false;
  
 
  @ViewChild('imageCropModal') imageCropModal: any; // Reference to the image cropping modal
  imageChangedEvent: any = '';
  croppedImage: any = '';
  display: string='';
  bsModalRef!: BsModalRef<unknown>;
  profileImageFile!: File;

  
  constructor(private service: ProfileService) { 

    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.employeeId = parsedUserData.empId;
    }
  }
  form = new FormGroup({
    firstName: new FormControl({ value: '', disabled: true }, Validators.required),
    lastName: new FormControl({ value: '', disabled: true }, Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.email),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
      Validators.maxLength(10),
      Validators.minLength(10)
    ]),
    department: new FormControl({ value: '', disabled: true }),
    reportsTo: new FormControl({ value: '', disabled: true }),
    projectId: new FormControl({ value: '', disabled: true }),
    projectName: new FormControl({ value: '', disabled: true }),
    address: new FormControl('', Validators.required),
    profilePicture:new FormControl('')
  });
  ngOnInit() {
    this.form.disable();
    this.fetchEmployeeData();
  }

  // to enable the form when the user click on edit button and disable the form when the user click on the save button
  toggleEditMode() {
    this.editMode = !this.editMode;

    if (this.editMode) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }
  //get the employee details that needs to be shown in the profile page
  fetchEmployeeData() {
    this.service.getEmployeeData(this.employeeId).subscribe({
      next: (data: any) => {
        console.log(data);
        //store the initial data of the employee
        this.initialValue = { contactNumber: data.contactNumber, address: data.address }
        this.initialData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          reportsTo: data.reportsTo,
          department: data.departmentName,
          projectId: data.projectCode,
          projectName: data.projectName
        }
        this.form.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          reportsTo: data.reportsTo,
          contactNumber: data.contactNumber,
          address: data.address,
          department: data.departmentName,
          projectId: data.projectCode,
          projectName: data.projectName
        });
      },
      error: (error: any) => {
        console.error('Error fetching employee data:', error);
        alert('Error occurred while fetching employee data.');
      },
      complete: () => {
        console.log('completed');
      },
    });
  }
  //to patch the values after the user click on the save button
  onSubmit() {

  const formData = new FormData();

  // Check if the profileImage is indeed a File object
  if (this.profileImageFile instanceof File) {
    formData.append('profilePicture', this.profileImageFile);
  } 
  console.log(formData.get('profilePicture'));
  
    //making the initial values as empty
    let updatedData: { contactNumber?: String; address?: String } = {
      contactNumber: '',
      address: ''
    };

    console.log('upadted Data', updatedData)
    console.log('initial value', this.initialValue)
    console.log(this.form.controls);


    //  check if the initially stored value is same as the value in the form after the user click on save button.
    //  if the value is same make updatedData value as undefined otherwise assign the new value to the updated.

    this.initialValue['contactNumber'] === this.form.get('contactNumber')?.value
      ? (updatedData.contactNumber = undefined)
      : (updatedData.contactNumber = this.form.get('contactNumber')?.value ?? undefined);

    this.initialValue['address'] === this.form.get('address')?.value
      ? (updatedData.address = undefined)
      : (updatedData.address = this.form.get('address')?.value ?? undefined);



    //store the values in form as the initial value, it is for to not to make API call.
    this.initialValue = { contactNumber: this.form.get('contactNumber')?.value, address: this.form.get('address')?.value }

    //if the updatedData is undefined for both contactNumber and address dont need to patch the value
    //so this condition is to avoid unnecessary API call
    if ((updatedData.contactNumber !== undefined || updatedData.address !== undefined)) {
      //only allow to patch the data when the form is dirty, touched and valid.
      //whenever user click on edit and save button unnecessary API call won't go
      if (this.form.dirty && this.form.touched && this.form.valid) {
        console.log('updated value', updatedData)
        this.service.updateProfile(this.employeeId, updatedData).subscribe(() => {
          console.log('PATCH request successful');
          this.toggleEditMode();

          //to reset the form state, make it empty
          this.form.reset();

          //assign the values in the initialData and initialValue to the formcontrol name
          //this is to avoid API call
          this.form.patchValue({
            firstName: this.initialData['firstName'],
            lastName: this.initialData['lastName'],
            email: this.initialData['email'],
            reportsTo: this.initialData['reportsTo'],
            contactNumber: this.initialValue['contactNumber'],
            address: this.initialValue['address'],
            department: this.initialData['department'],
            projectId: this.initialData['projectId'],
            projectName: this.initialData['projectName']
          });
        }, (error) => {
          console.error('Error in PATCH request:', error);
        });
      } else {
        alert('The data you have entered is not valid!!!');
      }
    } else {
      this.toggleEditMode();
    }
  }

  onProfilePictureClick() {
    // Explicitly cast the result to HTMLInputElement
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    if (fileInput) {
      fileInput.click();
    }
  }
  onImageSelected(event: any):void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.imageChangedEvent = event; // Save the event for cropping
      console.log('imagechangedevent',this.imageChangedEvent)
      this.openImageCropModal();
    }
  }
  
  openImageCropModal() {
    this.display= 'block';
  }
  
  imageCropped(event: ImageCroppedEvent) {
    if (event.blob) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.croppedImage = e.target?.result as string;
      };
      reader.readAsDataURL(event.blob);
    } else {
      console.error('Error: Blob data is not available in ImageCroppedEvent.', event);
    }
  }
  
  onCropImageSave() {
    this.profileImage = this.croppedImage;
    console.log('this.profileImage',this.profileImage)
  
    // this.newImageSelected = true;
  const blob = this.dataURLtoBlob(this.croppedImage);
  const imageName = `profile_${this.employeeId}.png`; // Example filename with timestamp
  const imageFile = new File([blob], imageName, { type: 'image/png' });
  console.log('image name',imageName,' and image file ', imageFile)

  this.profileImageFile = imageFile; // Now, this.profileImage is a File object
  this.newImageSelected = true;
  
    this.closeModal(); 
  }
  // Method to close the modal
  closeModal() {
    this.display = 'none'; // Hide the modal
    
    // Reset the input value
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Clear the file input after closing the modal
    }
  }
  private dataURLtoBlob(dataURL: string): Blob {
    const byteString = window.atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([ab], {type: mimeString});
  }
  
}
