import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminWaitingRequestsComponent } from './travel-admin-waiting-requests.component';

describe('TravelAdminWaitingRequestsComponent', () => {
  let component: TravelAdminWaitingRequestsComponent;
  let fixture: ComponentFixture<TravelAdminWaitingRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminWaitingRequestsComponent]
    });
    fixture = TestBed.createComponent(TravelAdminWaitingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
