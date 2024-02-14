import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGaugeComponent } from './dashboard-gauge.component';

describe('DashboardGaugeComponent', () => {
  let component: DashboardGaugeComponent;
  let fixture: ComponentFixture<DashboardGaugeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardGaugeComponent]
    });
    fixture = TestBed.createComponent(DashboardGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
