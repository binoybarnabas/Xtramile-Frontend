import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelMessengerModalComponent } from './travel-messenger-modal.component';

describe('TravelMessengerModalComponent', () => {
  let component: TravelMessengerModalComponent;
  let fixture: ComponentFixture<TravelMessengerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelMessengerModalComponent]
    });
    fixture = TestBed.createComponent(TravelMessengerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
