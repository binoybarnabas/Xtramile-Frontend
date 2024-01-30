import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerIncomingTravelRequestsComponent } from './manager-incoming-travel-requests.component';

describe('ManagerIncomingTravelRequestsComponent', () => {
  let component: ManagerIncomingTravelRequestsComponent;
  let fixture: ComponentFixture<ManagerIncomingTravelRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerIncomingTravelRequestsComponent]
    });
    fixture = TestBed.createComponent(ManagerIncomingTravelRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
