import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePersonnelPendingRequestsComponent } from './finance-personnel-pending-requests.component';

describe('FinancePersonnelPendingRequestsComponent', () => {
  let component: FinancePersonnelPendingRequestsComponent;
  let fixture: ComponentFixture<FinancePersonnelPendingRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancePersonnelPendingRequestsComponent]
    });
    fixture = TestBed.createComponent(FinancePersonnelPendingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
