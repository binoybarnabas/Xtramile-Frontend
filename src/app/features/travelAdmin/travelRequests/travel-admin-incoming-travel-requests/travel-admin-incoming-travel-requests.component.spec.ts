import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminIncomingTravelRequestsComponent } from './travel-admin-incoming-travel-requests.component';

describe('TravelAdminIncomingTravelRequestsComponent', () => {
  let component: TravelAdminIncomingTravelRequestsComponent;
  let fixture: ComponentFixture<TravelAdminIncomingTravelRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminIncomingTravelRequestsComponent]
    });
    fixture = TestBed.createComponent(TravelAdminIncomingTravelRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
