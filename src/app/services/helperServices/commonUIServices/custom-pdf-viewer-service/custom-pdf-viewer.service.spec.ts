import { TestBed } from '@angular/core/testing';

import { CustomPdfViewerService } from './custom-pdf-viewer.service';

describe('CustomPdfViewerService', () => {
  let service: CustomPdfViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomPdfViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
