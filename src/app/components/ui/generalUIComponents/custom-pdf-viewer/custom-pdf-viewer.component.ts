import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-pdf-viewer',
  templateUrl: './custom-pdf-viewer.component.html',
  styleUrls: ['./custom-pdf-viewer.component.css']
})
export class CustomPdfViewerComponent {

  @Input() fileUrl : string = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  @Output() close = new EventEmitter<void>();

  zoomLevel = 1; // Initial zoom level

  zoomIn(): void {
    this.zoomLevel += 0.25;
  }

  zoomOut(): void {
    if (this.zoomLevel > 0.25) {
      this.zoomLevel -= 0.25;
    }
  }

  closePdfViewer() {
    this.close.emit();
  }

}
