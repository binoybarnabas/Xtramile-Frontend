import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTravelOptionsViewerComponent } from './manager-travel-options-viewer.component';

describe('ManagerTravelOptionsViewerComponent', () => {
  let component: ManagerTravelOptionsViewerComponent;
  let fixture: ComponentFixture<ManagerTravelOptionsViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerTravelOptionsViewerComponent]
    });
    fixture = TestBed.createComponent(ManagerTravelOptionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
