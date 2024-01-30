import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNewRequestComponent } from './manager-new-request.component';

describe('ManagerNewRequestComponent', () => {
  let component: ManagerNewRequestComponent;
  let fixture: ComponentFixture<ManagerNewRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerNewRequestComponent]
    });
    fixture = TestBed.createComponent(ManagerNewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
