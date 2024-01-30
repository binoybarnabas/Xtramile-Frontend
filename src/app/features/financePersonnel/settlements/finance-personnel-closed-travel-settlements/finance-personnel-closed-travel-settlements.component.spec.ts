import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelClosedTravelSettlementsComponent } from './finance-personnel-closed-travel-settlements.component';

describe('FinancePersonnelClosedTravelSettlementsComponent', () => {
  let component: FinancePersonnelClosedTravelSettlementsComponent;
  let fixture: ComponentFixture<FinancePersonnelClosedTravelSettlementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelClosedTravelSettlementsComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelClosedTravelSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
