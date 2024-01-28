import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminSideNavBarComponent } from './travel-admin-side-nav-bar.component';

describe('TravelAdminSideNavBarComponent', () => {
  let component: TravelAdminSideNavBarComponent;
  let fixture: ComponentFixture<TravelAdminSideNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminSideNavBarComponent]
    });
    fixture = TestBed.createComponent(TravelAdminSideNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
