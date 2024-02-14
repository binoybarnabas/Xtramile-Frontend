import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCalenderComponent } from './dashboard-calender.component';

describe('DashboardCalenderComponent', () => {
  let component: DashboardCalenderComponent;
  let fixture: ComponentFixture<DashboardCalenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCalenderComponent]
    });
    fixture = TestBed.createComponent(DashboardCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
