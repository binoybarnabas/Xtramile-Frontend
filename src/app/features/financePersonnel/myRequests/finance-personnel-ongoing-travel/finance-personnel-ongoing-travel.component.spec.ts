import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelOngoingTravelComponent } from './finance-personnel-ongoing-travel.component';

describe('FinancePersonnelOngoingTravelComponent', () => {
  let component: FinancePersonnelOngoingTravelComponent;
  let fixture: ComponentFixture<FinancePersonnelOngoingTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelOngoingTravelComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelOngoingTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
