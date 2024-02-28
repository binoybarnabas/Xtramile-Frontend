import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDoneTripsComponent } from './dashboard-done-trips.component';

describe('DashboardDoneTripsComponent', () => {
  let component: DashboardDoneTripsComponent;
  let fixture: ComponentFixture<DashboardDoneTripsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDoneTripsComponent]
    });
    fixture = TestBed.createComponent(DashboardDoneTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
