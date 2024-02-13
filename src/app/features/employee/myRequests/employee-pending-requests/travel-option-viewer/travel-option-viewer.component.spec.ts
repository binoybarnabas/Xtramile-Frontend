import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelOptionViewerComponent } from './travel-option-viewer.component';

describe('TravelOptionViewerComponent', () => {
  let component: TravelOptionViewerComponent;
  let fixture: ComponentFixture<TravelOptionViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelOptionViewerComponent]
    });
    fixture = TestBed.createComponent(TravelOptionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
