import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePendingRequestsComponent } from './employee-pending-requests.component';

describe('EmployeePendingRequestsComponent', () => {
  let component: EmployeePendingRequestsComponent;
  let fixture: ComponentFixture<EmployeePendingRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeePendingRequestsComponent]
    });
    fixture = TestBed.createComponent(EmployeePendingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
