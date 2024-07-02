import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { ImageViewerService } from 'src/app/services/helperServices/commonUIServices/image-viewer-service/image-viewer.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent {
 
  // @Input() images: string[] = [];
  // @Input() descriptions: string[] = [];
  // @Input() currentImageIndex: number = 0;
  @Output() close = new EventEmitter<void>();
  

   
  @Input() image: string = '';
  @Input() description: string ='';
  @Input() currentImageIndex: number = 0;
  
  zoomLevel = 1;
  //currentImageIndex = 0;

  constructor(private imageViewerService: ImageViewerService, private sideNavBarService: SideNavBarService){

  }

  ngOnInit(): void {

  }

  zoomIn() {
    this.zoomLevel += 0.1;
  }

  zoomOut() {
    if (this.zoomLevel > 0.2) {
      this.zoomLevel -= 0.1;
    }
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage() {
    // if (this.currentImageIndex < this.images.length - 1) {
    //   this.currentImageIndex++;
    // }
  }

  closeImageViewer() {
   //this.close.emit();
   this.imageViewerService.close();
  }

  // Getter to access the collapsed state from the service
  get isSideNavBarCollapsed(): boolean {
      return this.sideNavBarService.isSideNavBarCollapsed;
  }

}
