import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNewBillComponent } from './employee-new-bill.component';

describe('EmployeeNewBillComponent', () => {
  let component: EmployeeNewBillComponent;
  let fixture: ComponentFixture<EmployeeNewBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeNewBillComponent]
    });
    fixture = TestBed.createComponent(EmployeeNewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
