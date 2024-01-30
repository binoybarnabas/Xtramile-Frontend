import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminNewBillComponent } from './travel-admin-new-bill.component';

describe('TravelAdminNewBillComponent', () => {
  let component: TravelAdminNewBillComponent;
  let fixture: ComponentFixture<TravelAdminNewBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminNewBillComponent]
    });
    fixture = TestBed.createComponent(TravelAdminNewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
