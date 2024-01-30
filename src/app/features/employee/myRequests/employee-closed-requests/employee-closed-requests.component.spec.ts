import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeClosedRequestsComponent } from './employee-closed-requests.component';

describe('EmployeeClosedRequestsComponent', () => {
  let component: EmployeeClosedRequestsComponent;
  let fixture: ComponentFixture<EmployeeClosedRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeClosedRequestsComponent]
    });
    fixture = TestBed.createComponent(EmployeeClosedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
