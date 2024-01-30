import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminNewRequestComponent } from './travel-admin-new-request.component';

describe('TravelAdminNewRequestComponent', () => {
  let component: TravelAdminNewRequestComponent;
  let fixture: ComponentFixture<TravelAdminNewRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminNewRequestComponent]
    });
    fixture = TestBed.createComponent(TravelAdminNewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
