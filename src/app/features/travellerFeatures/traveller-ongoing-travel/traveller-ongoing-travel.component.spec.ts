import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerOngoingTravelComponent } from './traveller-ongoing-travel.component';

describe('TravellerOngoingTravelComponent', () => {
  let component: TravellerOngoingTravelComponent;
  let fixture: ComponentFixture<TravellerOngoingTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravellerOngoingTravelComponent]
    });
    fixture = TestBed.createComponent(TravellerOngoingTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
