import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminHomeComponent } from './travel-admin-home.component';

describe('TravelAdminHomeComponent', () => {
  let component: TravelAdminHomeComponent;
  let fixture: ComponentFixture<TravelAdminHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminHomeComponent]
    });
    fixture = TestBed.createComponent(TravelAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
