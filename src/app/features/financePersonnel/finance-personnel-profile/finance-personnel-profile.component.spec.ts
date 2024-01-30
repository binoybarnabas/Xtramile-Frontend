import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelProfileComponent } from './finance-personnel-profile.component';

describe('FinancePersonnelProfileComponent', () => {
  let component: FinancePersonnelProfileComponent;
  let fixture: ComponentFixture<FinancePersonnelProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelProfileComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
