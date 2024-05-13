import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedOptionViewerComponent } from './tabbed-option-viewer.component';

describe('TabbedOptionViewerComponent', () => {
  let component: TabbedOptionViewerComponent;
  let fixture: ComponentFixture<TabbedOptionViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabbedOptionViewerComponent]
    });
    fixture = TestBed.createComponent(TabbedOptionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
