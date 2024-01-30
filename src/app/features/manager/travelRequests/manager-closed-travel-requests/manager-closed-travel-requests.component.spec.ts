import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerClosedTravelRequestsComponent } from './manager-closed-travel-requests.component';

describe('ManagerClosedTravelRequestsComponent', () => {
  let component: ManagerClosedTravelRequestsComponent;
  let fixture: ComponentFixture<ManagerClosedTravelRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerClosedTravelRequestsComponent]
    });
    fixture = TestBed.createComponent(ManagerClosedTravelRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
