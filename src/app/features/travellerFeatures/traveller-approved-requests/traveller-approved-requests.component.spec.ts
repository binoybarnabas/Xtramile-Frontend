import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerApprovedRequestsComponent } from './traveller-approved-requests.component';

describe('TravellerApprovedRequestsComponent', () => {
  let component: TravellerApprovedRequestsComponent;
  let fixture: ComponentFixture<TravellerApprovedRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravellerApprovedRequestsComponent]
    });
    fixture = TestBed.createComponent(TravellerApprovedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
