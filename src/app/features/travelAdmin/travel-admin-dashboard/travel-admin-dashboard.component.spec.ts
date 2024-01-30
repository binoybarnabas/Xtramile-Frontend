import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminDashboardComponent } from './travel-admin-dashboard.component';

describe('TravelAdminDashboardComponent', () => {
  let component: TravelAdminDashboardComponent;
  let fixture: ComponentFixture<TravelAdminDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminDashboardComponent]
    });
    fixture = TestBed.createComponent(TravelAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
