import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelHomeComponent } from './finance-personnel-home.component';

describe('FinancePersonnelHomeComponent', () => {
  let component: FinancePersonnelHomeComponent;
  let fixture: ComponentFixture<FinancePersonnelHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelHomeComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
