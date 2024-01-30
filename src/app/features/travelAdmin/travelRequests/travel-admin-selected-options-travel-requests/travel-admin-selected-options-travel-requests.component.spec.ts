import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminSelectedOptionsTravelRequestsComponent } from './travel-admin-selected-options-travel-requests.component';

describe('TravelAdminSelectedOptionsTravelRequestsComponent', () => {
  let component: TravelAdminSelectedOptionsTravelRequestsComponent;
  let fixture: ComponentFixture<TravelAdminSelectedOptionsTravelRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminSelectedOptionsTravelRequestsComponent]
    });
    fixture = TestBed.createComponent(TravelAdminSelectedOptionsTravelRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
