import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminPendingRequestsComponent } from './travel-admin-pending-requests.component';

describe('TravelAdminPendingRequestsComponent', () => {
  let component: TravelAdminPendingRequestsComponent;
  let fixture: ComponentFixture<TravelAdminPendingRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminPendingRequestsComponent]
    });
    fixture = TestBed.createComponent(TravelAdminPendingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
