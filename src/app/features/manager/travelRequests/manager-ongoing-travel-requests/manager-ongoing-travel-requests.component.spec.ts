import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerOngoingTravelRequestsComponent } from './manager-ongoing-travel-requests.component';

describe('ManagerOngoingTravelRequestsComponent', () => {
  let component: ManagerOngoingTravelRequestsComponent;
  let fixture: ComponentFixture<ManagerOngoingTravelRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerOngoingTravelRequestsComponent]
    });
    fixture = TestBed.createComponent(ManagerOngoingTravelRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
