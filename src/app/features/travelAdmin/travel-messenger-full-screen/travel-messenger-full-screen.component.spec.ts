import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelMessengerFullScreenComponent } from './travel-messenger-full-screen.component';

describe('TravelMessengerFullScreenComponent', () => {
  let component: TravelMessengerFullScreenComponent;
  let fixture: ComponentFixture<TravelMessengerFullScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelMessengerFullScreenComponent]
    });
    fixture = TestBed.createComponent(TravelMessengerFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
