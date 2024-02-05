import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewCardComponent } from './employee-view-card.component';

describe('EmployeeViewCardComponent', () => {
  let component: EmployeeViewCardComponent;
  let fixture: ComponentFixture<EmployeeViewCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeViewCardComponent]
    });
    fixture = TestBed.createComponent(EmployeeViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
