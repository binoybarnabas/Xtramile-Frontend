import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminWaitingOptionsTravelRequestsComponent } from './travel-admin-waiting-options-travel-requests.component';

describe('TravelAdminWaitingOptionsTravelRequestsComponent', () => {
  let component: TravelAdminWaitingOptionsTravelRequestsComponent;
  let fixture: ComponentFixture<TravelAdminWaitingOptionsTravelRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminWaitingOptionsTravelRequestsComponent]
    });
    fixture = TestBed.createComponent(TravelAdminWaitingOptionsTravelRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
