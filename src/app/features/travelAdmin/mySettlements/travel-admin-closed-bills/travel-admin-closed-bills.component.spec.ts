import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminClosedBillsComponent } from './travel-admin-closed-bills.component';

describe('TravelAdminClosedBillsComponent', () => {
  let component: TravelAdminClosedBillsComponent;
  let fixture: ComponentFixture<TravelAdminClosedBillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminClosedBillsComponent]
    });
    fixture = TestBed.createComponent(TravelAdminClosedBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
