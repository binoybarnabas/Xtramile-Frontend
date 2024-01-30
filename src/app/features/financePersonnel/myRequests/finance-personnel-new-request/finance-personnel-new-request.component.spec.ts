import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelNewRequestComponent } from './finance-personnel-new-request.component';

describe('FinancePersonnelNewRequestComponent', () => {
  let component: FinancePersonnelNewRequestComponent;
  let fixture: ComponentFixture<FinancePersonnelNewRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelNewRequestComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelNewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
