import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerTravelHistoryComponent } from './traveller-travel-history.component';

describe('TravellerTravelHistoryComponent', () => {
  let component: TravellerTravelHistoryComponent;
  let fixture: ComponentFixture<TravellerTravelHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravellerTravelHistoryComponent]
    });
    fixture = TestBed.createComponent(TravellerTravelHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
