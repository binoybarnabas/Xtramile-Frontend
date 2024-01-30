import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminProfileComponent } from './travel-admin-profile.component';

describe('TravelAdminProfileComponent', () => {
  let component: TravelAdminProfileComponent;
  let fixture: ComponentFixture<TravelAdminProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminProfileComponent]
    });
    fixture = TestBed.createComponent(TravelAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
