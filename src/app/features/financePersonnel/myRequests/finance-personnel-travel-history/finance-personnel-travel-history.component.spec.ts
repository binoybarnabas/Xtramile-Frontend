import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelTravelHistoryComponent } from './finance-personnel-travel-history.component';

describe('FinancePersonnelTravelHistoryComponent', () => {
  let component: FinancePersonnelTravelHistoryComponent;
  let fixture: ComponentFixture<FinancePersonnelTravelHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelTravelHistoryComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelTravelHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
