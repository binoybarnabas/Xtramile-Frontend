import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelMiddleConsoleComponent } from './finance-personnel-middle-console.component';

describe('FinancePersonnelMiddleConsoleComponent', () => {
  let component: FinancePersonnelMiddleConsoleComponent;
  let fixture: ComponentFixture<FinancePersonnelMiddleConsoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelMiddleConsoleComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelMiddleConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
