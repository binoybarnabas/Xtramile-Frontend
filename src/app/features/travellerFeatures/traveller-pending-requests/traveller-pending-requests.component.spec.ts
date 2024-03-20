import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerPendingRequestsComponent } from './traveller-pending-requests.component';

describe('TravellerPendingRequestsComponent', () => {
  let component: TravellerPendingRequestsComponent;
  let fixture: ComponentFixture<TravellerPendingRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravellerPendingRequestsComponent]
    });
    fixture = TestBed.createComponent(TravellerPendingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
