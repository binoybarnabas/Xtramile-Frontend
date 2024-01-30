import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePendingBillComponent } from './employee-pending-bill.component';

describe('EmployeePendingBillComponent', () => {
  let component: EmployeePendingBillComponent;
  let fixture: ComponentFixture<EmployeePendingBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeePendingBillComponent]
    });
    fixture = TestBed.createComponent(EmployeePendingBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
