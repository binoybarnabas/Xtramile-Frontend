import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelPendingTravelSettlementsComponent } from './finance-personnel-pending-travel-settlements.component';

describe('FinancePersonnelPendingTravelSettlementsComponent', () => {
  let component: FinancePersonnelPendingTravelSettlementsComponent;
  let fixture: ComponentFixture<FinancePersonnelPendingTravelSettlementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelPendingTravelSettlementsComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelPendingTravelSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
