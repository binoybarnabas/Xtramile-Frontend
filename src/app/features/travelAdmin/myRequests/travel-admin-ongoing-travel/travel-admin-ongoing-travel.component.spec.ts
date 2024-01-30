import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminOngoingTravelComponent } from './travel-admin-ongoing-travel.component';

describe('TravelAdminOngoingTravelComponent', () => {
  let component: TravelAdminOngoingTravelComponent;
  let fixture: ComponentFixture<TravelAdminOngoingTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminOngoingTravelComponent]
    });
    fixture = TestBed.createComponent(TravelAdminOngoingTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
