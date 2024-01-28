import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelTopBarComponent } from './finance-personnel-top-bar.component';

describe('FinancePersonnelTopBarComponent', () => {
  let component: FinancePersonnelTopBarComponent;
  let fixture: ComponentFixture<FinancePersonnelTopBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelTopBarComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
