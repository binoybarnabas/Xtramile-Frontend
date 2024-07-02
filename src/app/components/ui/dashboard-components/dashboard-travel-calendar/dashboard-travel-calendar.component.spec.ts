import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTravelCalendarComponent } from './dashboard-travel-calendar.component';

describe('DashboardTravelCalendarComponent', () => {
  let component: DashboardTravelCalendarComponent;
  let fixture: ComponentFixture<DashboardTravelCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTravelCalendarComponent]
    });
    fixture = TestBed.createComponent(DashboardTravelCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
