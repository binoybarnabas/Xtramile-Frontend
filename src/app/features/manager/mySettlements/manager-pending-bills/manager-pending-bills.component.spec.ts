import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPendingBillsComponent } from './manager-pending-bills.component';

describe('ManagerPendingBillsComponent', () => {
  let component: ManagerPendingBillsComponent;
  let fixture: ComponentFixture<ManagerPendingBillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerPendingBillsComponent]
    });
    fixture = TestBed.createComponent(ManagerPendingBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
