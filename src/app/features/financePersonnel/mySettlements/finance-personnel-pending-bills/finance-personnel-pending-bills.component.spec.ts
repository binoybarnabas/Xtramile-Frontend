import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelPendingBillsComponent } from './finance-personnel-pending-bills.component';

describe('FinancePersonnelPendingBillsComponent', () => {
  let component: FinancePersonnelPendingBillsComponent;
  let fixture: ComponentFixture<FinancePersonnelPendingBillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelPendingBillsComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelPendingBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
