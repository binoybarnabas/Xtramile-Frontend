import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelNewBillComponent } from './finance-personnel-new-bill.component';

describe('FinancePersonnelNewBillComponent', () => {
  let component: FinancePersonnelNewBillComponent;
  let fixture: ComponentFixture<FinancePersonnelNewBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelNewBillComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelNewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
