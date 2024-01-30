import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminOngoingTravelRequestsComponent } from './travel-admin-ongoing-travel-requests.component';

describe('TravelAdminOngoingTravelRequestsComponent', () => {
  let component: TravelAdminOngoingTravelRequestsComponent;
  let fixture: ComponentFixture<TravelAdminOngoingTravelRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminOngoingTravelRequestsComponent]
    });
    fixture = TestBed.createComponent(TravelAdminOngoingTravelRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
