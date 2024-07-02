import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomPdfViewerService {

  constructor() { }
  
  isPdfViewerOpen: boolean = false;

  open() {
    this.isPdfViewerOpen = true;
  }

  close() {
      this.isPdfViewerOpen = false;
  }
}
