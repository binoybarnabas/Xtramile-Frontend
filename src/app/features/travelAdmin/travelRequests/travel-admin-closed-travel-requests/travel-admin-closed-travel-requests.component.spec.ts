import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminClosedTravelRequestsComponent } from './travel-admin-closed-travel-requests.component';

describe('TravelAdminClosedTravelRequestsComponent', () => {
  let component: TravelAdminClosedTravelRequestsComponent;
  let fixture: ComponentFixture<TravelAdminClosedTravelRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminClosedTravelRequestsComponent]
    });
    fixture = TestBed.createComponent(TravelAdminClosedTravelRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
