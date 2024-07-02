import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SideNavBarService } from 'src/app/services/employeeServices/layoutServices/side-nav-bar.service';
import { CustomLoaderService } from 'src/app/services/helperServices/commonUIServices/custom-loader-service/custom-loader.service';
import { CustomPdfViewerService } from 'src/app/services/helperServices/commonUIServices/custom-pdf-viewer-service/custom-pdf-viewer.service';
@Component({
  selector: 'app-custom-pdf-viewer',
  templateUrl: './custom-pdf-viewer.component.html',
  styleUrls: ['./custom-pdf-viewer.component.css']
})
export class CustomPdfViewerComponent {

  @Input() fileUrl : string = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  @Input() documentType: string = '';
  @Output() close = new EventEmitter<void>();

  zoomLevel = 1; // Initial zoom level

  constructor(private http: HttpClient, private loaderService : CustomLoaderService, private sideNavBarService: SideNavBarService, private customPdfViewer: CustomPdfViewerService){}

  onDownloadFileClick(url: string){

    this.loaderService.show();

    const header = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store',
      'Expires': '0'    
    })
    this.http.get(url, {responseType: 'blob', headers: header}).subscribe({
      next: (data: Blob) =>{

        this.loaderService.hide()

        const blob = new Blob([data], {type: data.type});
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'File'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);      
      },
      error: (error : Error) => {
        this.loaderService.hide()
        console.error("Error Downloading File");
        console.error(error.message);
      },
      complete: () => {
      }
    })
  }

  zoomIn(): void {
    this.zoomLevel += 0.25;
  }

  zoomOut(): void {
    if (this.zoomLevel > 0.25) {
      this.zoomLevel -= 0.25;
    }
  }

  closePdfViewer() {
    //this.close.emit();
    this.customPdfViewer.close();
  }

   // Getter to access the collapsed state from the service
   get isSideNavBarCollapsed(): boolean {
    return this.sideNavBarService.isSideNavBarCollapsed;
}

}
