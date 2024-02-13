import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProgressComponent } from './dashboard-progress.component';

describe('DashboardProgressComponent', () => {
  let component: DashboardProgressComponent;
  let fixture: ComponentFixture<DashboardProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardProgressComponent]
    });
    fixture = TestBed.createComponent(DashboardProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
