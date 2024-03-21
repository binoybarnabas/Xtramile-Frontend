import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReportGeneratorComponent } from './dashboard-report-generator.component';

describe('DashboardReportGeneratorComponent', () => {
  let component: DashboardReportGeneratorComponent;
  let fixture: ComponentFixture<DashboardReportGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardReportGeneratorComponent]
    });
    fixture = TestBed.createComponent(DashboardReportGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
