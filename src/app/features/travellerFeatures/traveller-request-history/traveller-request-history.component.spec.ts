import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerRequestHistoryComponent } from './traveller-request-history.component';

describe('TravellerRequestHistoryComponent', () => {
  let component: TravellerRequestHistoryComponent;
  let fixture: ComponentFixture<TravellerRequestHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravellerRequestHistoryComponent]
    });
    fixture = TestBed.createComponent(TravellerRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
