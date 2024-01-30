import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminClosedTravelSettlementsComponent } from './travel-admin-closed-travel-settlements.component';

describe('TravelAdminClosedTravelSettlementsComponent', () => {
  let component: TravelAdminClosedTravelSettlementsComponent;
  let fixture: ComponentFixture<TravelAdminClosedTravelSettlementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminClosedTravelSettlementsComponent]
    });
    fixture = TestBed.createComponent(TravelAdminClosedTravelSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
