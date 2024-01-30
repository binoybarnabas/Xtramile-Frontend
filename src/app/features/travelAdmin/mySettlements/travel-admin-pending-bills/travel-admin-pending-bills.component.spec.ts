import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminPendingBillsComponent } from './travel-admin-pending-bills.component';

describe('TravelAdminPendingBillsComponent', () => {
  let component: TravelAdminPendingBillsComponent;
  let fixture: ComponentFixture<TravelAdminPendingBillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminPendingBillsComponent]
    });
    fixture = TestBed.createComponent(TravelAdminPendingBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
