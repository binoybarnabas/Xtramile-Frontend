import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelDashboardComponent } from './finance-personnel-dashboard.component';

describe('FinancePersonnelDashboardComponent', () => {
  let component: FinancePersonnelDashboardComponent;
  let fixture: ComponentFixture<FinancePersonnelDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelDashboardComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
