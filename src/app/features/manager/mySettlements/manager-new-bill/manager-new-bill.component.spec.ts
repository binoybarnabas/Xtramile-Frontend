import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNewBillComponent } from './manager-new-bill.component';

describe('ManagerNewBillComponent', () => {
  let component: ManagerNewBillComponent;
  let fixture: ComponentFixture<ManagerNewBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerNewBillComponent]
    });
    fixture = TestBed.createComponent(ManagerNewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
