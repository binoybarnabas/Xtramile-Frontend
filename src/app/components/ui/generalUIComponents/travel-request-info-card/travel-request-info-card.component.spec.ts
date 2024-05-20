import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequestInfoCardComponent } from './travel-request-info-card.component';

describe('TravelRequestInfoCardComponent', () => {
  let component: TravelRequestInfoCardComponent;
  let fixture: ComponentFixture<TravelRequestInfoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelRequestInfoCardComponent]
    });
    fixture = TestBed.createComponent(TravelRequestInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
