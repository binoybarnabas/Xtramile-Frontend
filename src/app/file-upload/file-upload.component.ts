import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {


  fileUploadForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fileUploadForm = this.fb.group({
      file: ['']
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.fileUploadForm.get('file')?.setValue(file);
      this.previewFile(file);
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.fileUploadForm.get('file')?.setValue(file);
      this.previewFile(file);
    }
  }

  private previewFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
  }

  onSubmit() {
    // Handle form submission, e.g., file upload
    const selectedFile = this.fileUploadForm.get('file')?.value;
    console.log('Selected file:', selectedFile);
    // Perform further actions like uploading the file via a service
  }

}




