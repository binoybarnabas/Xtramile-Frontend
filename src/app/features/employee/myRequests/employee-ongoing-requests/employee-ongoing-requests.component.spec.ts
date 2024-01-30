import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOngoingRequestsComponent } from './employee-ongoing-requests.component';

describe('EmployeeOngoingRequestsComponent', () => {
  let component: EmployeeOngoingRequestsComponent;
  let fixture: ComponentFixture<EmployeeOngoingRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeOngoingRequestsComponent]
    });
    fixture = TestBed.createComponent(EmployeeOngoingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
