import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTopBarComponent } from './manager-top-bar.component';

describe('ManagerTopBarComponent', () => {
  let component: ManagerTopBarComponent;
  let fixture: ComponentFixture<ManagerTopBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerTopBarComponent]
    });
    fixture = TestBed.createComponent(ManagerTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
