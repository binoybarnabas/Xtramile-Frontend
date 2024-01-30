import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelClosedBillsComponent } from './finance-personnel-closed-bills.component';

describe('FinancePersonnelClosedBillsComponent', () => {
  let component: FinancePersonnelClosedBillsComponent;
  let fixture: ComponentFixture<FinancePersonnelClosedBillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelClosedBillsComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelClosedBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
