import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusButtonComponent } from './change-status-button.component';

describe('ChangeStatusButtonComponent', () => {
  let component: ChangeStatusButtonComponent;
  let fixture: ComponentFixture<ChangeStatusButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeStatusButtonComponent]
    });
    fixture = TestBed.createComponent(ChangeStatusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
