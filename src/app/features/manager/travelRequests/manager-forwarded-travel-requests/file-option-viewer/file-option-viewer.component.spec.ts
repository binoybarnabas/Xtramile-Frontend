import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileOptionViewerComponent } from './file-option-viewer.component';

describe('FileOptionViewerComponent', () => {
  let component: FileOptionViewerComponent;
  let fixture: ComponentFixture<FileOptionViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileOptionViewerComponent]
    });
    fixture = TestBed.createComponent(FileOptionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
