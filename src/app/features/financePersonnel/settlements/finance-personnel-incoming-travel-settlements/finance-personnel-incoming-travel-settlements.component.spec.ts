import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelIncomingTravelSettlementsComponent } from './finance-personnel-incoming-travel-settlements.component';

describe('FinancePersonnelIncomingTravelSettlementsComponent', () => {
  let component: FinancePersonnelIncomingTravelSettlementsComponent;
  let fixture: ComponentFixture<FinancePersonnelIncomingTravelSettlementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelIncomingTravelSettlementsComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelIncomingTravelSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
