import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingTripCardComponent } from './upcoming-trip-card.component';

describe('UpcomingTripCardComponent', () => {
  let component: UpcomingTripCardComponent;
  let fixture: ComponentFixture<UpcomingTripCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingTripCardComponent]
    });
    fixture = TestBed.createComponent(UpcomingTripCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
