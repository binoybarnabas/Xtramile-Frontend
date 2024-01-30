import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeClosedBillsComponent } from './employee-closed-bills.component';

describe('EmployeeClosedBillsComponent', () => {
  let component: EmployeeClosedBillsComponent;
  let fixture: ComponentFixture<EmployeeClosedBillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeClosedBillsComponent]
    });
    fixture = TestBed.createComponent(EmployeeClosedBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
