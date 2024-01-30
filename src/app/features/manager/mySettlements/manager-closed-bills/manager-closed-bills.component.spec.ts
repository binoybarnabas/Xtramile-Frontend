import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerClosedBillsComponent } from './manager-closed-bills.component';

describe('ManagerClosedBillsComponent', () => {
  let component: ManagerClosedBillsComponent;
  let fixture: ComponentFixture<ManagerClosedBillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerClosedBillsComponent]
    });
    fixture = TestBed.createComponent(ManagerClosedBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
