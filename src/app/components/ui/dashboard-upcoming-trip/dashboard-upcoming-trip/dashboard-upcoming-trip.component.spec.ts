import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUpcomingTripComponent } from './dashboard-upcoming-trip.component';

describe('DashboardUpcomingTripComponent', () => {
  let component: DashboardUpcomingTripComponent;
  let fixture: ComponentFixture<DashboardUpcomingTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardUpcomingTripComponent]
    });
    fixture = TestBed.createComponent(DashboardUpcomingTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
