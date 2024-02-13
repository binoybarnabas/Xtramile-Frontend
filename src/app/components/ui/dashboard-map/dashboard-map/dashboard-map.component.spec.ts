import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMapComponent } from './dashboard-map.component';

describe('DashboardMapComponent', () => {
  let component: DashboardMapComponent;
  let fixture: ComponentFixture<DashboardMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardMapComponent]
    });
    fixture = TestBed.createComponent(DashboardMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
