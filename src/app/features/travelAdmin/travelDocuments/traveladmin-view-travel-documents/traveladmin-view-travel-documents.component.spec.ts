import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraveladminViewTravelDocumentsComponent } from './traveladmin-view-travel-documents.component';

describe('TraveladminViewTravelDocumentsComponent', () => {
  let component: TraveladminViewTravelDocumentsComponent;
  let fixture: ComponentFixture<TraveladminViewTravelDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraveladminViewTravelDocumentsComponent]
    });
    fixture = TestBed.createComponent(TraveladminViewTravelDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
