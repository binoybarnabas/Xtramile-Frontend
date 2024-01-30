import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminForwardedTravelSettlementsComponent } from './travel-admin-forwarded-travel-settlements.component';

describe('TravelAdminForwardedTravelSettlementsComponent', () => {
  let component: TravelAdminForwardedTravelSettlementsComponent;
  let fixture: ComponentFixture<TravelAdminForwardedTravelSettlementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminForwardedTravelSettlementsComponent]
    });
    fixture = TestBed.createComponent(TravelAdminForwardedTravelSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
