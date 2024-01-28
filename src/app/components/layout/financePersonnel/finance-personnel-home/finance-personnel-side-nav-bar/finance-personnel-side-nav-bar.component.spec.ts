import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelSideNavBarComponent } from './finance-personnel-side-nav-bar.component';

describe('FinancePersonnelSideNavBarComponent', () => {
  let component: FinancePersonnelSideNavBarComponent;
  let fixture: ComponentFixture<FinancePersonnelSideNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelSideNavBarComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelSideNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
