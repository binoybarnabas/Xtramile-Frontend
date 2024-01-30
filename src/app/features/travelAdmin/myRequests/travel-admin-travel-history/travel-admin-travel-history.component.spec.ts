import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminTravelHistoryComponent } from './travel-admin-travel-history.component';

describe('TravelAdminTravelHistoryComponent', () => {
  let component: TravelAdminTravelHistoryComponent;
  let fixture: ComponentFixture<TravelAdminTravelHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminTravelHistoryComponent]
    });
    fixture = TestBed.createComponent(TravelAdminTravelHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
