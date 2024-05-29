import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerRequestProgressDetailsComponent } from './traveller-request-progress-details.component';

describe('TravellerRequestProgressDetailsComponent', () => {
  let component: TravellerRequestProgressDetailsComponent;
  let fixture: ComponentFixture<TravellerRequestProgressDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravellerRequestProgressDetailsComponent]
    });
    fixture = TestBed.createComponent(TravellerRequestProgressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
