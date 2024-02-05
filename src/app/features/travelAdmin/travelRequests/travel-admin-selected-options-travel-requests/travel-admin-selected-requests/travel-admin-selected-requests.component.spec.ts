import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminSelectedRequestsComponent } from './travel-admin-selected-requests.component';

describe('TravelAdminSelectedRequestsComponent', () => {
  let component: TravelAdminSelectedRequestsComponent;
  let fixture: ComponentFixture<TravelAdminSelectedRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminSelectedRequestsComponent]
    });
    fixture = TestBed.createComponent(TravelAdminSelectedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
