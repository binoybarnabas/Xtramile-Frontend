import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerForwardedTravelRequestsComponent } from './manager-forwarded-travel-requests.component';

describe('ManagerForwardedTravelRequestsComponent', () => {
  let component: ManagerForwardedTravelRequestsComponent;
  let fixture: ComponentFixture<ManagerForwardedTravelRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerForwardedTravelRequestsComponent]
    });
    fixture = TestBed.createComponent(ManagerForwardedTravelRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
