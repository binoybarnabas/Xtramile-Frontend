import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomStepChartComponent } from './custom-step-chart.component';

describe('CustomStepChartComponent', () => {
  let component: CustomStepChartComponent;
  let fixture: ComponentFixture<CustomStepChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomStepChartComponent]
    });
    fixture = TestBed.createComponent(CustomStepChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
