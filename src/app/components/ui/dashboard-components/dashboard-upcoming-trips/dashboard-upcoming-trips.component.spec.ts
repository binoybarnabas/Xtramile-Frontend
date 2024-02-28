import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUpcomingTripsComponent } from './dashboard-upcoming-trips.component';

describe('DashboardUpcomingTripsComponent', () => {
  let component: DashboardUpcomingTripsComponent;
  let fixture: ComponentFixture<DashboardUpcomingTripsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardUpcomingTripsComponent]
    });
    fixture = TestBed.createComponent(DashboardUpcomingTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
