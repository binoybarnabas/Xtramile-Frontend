import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageViewerService {

  constructor() { }

  isImageViewerOpen: boolean = false;

  open() {
    this.isImageViewerOpen = true;
  }

  close() {
      this.isImageViewerOpen = false;
  }

}
