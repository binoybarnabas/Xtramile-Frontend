import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminIncomingTravelSettlementsComponent } from './travel-admin-incoming-travel-settlements.component';

describe('TravelAdminIncomingTravelSettlementsComponent', () => {
  let component: TravelAdminIncomingTravelSettlementsComponent;
  let fixture: ComponentFixture<TravelAdminIncomingTravelSettlementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminIncomingTravelSettlementsComponent]
    });
    fixture = TestBed.createComponent(TravelAdminIncomingTravelSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
