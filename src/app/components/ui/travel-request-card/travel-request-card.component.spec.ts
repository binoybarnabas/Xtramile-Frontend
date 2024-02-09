import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequestCardComponent } from './travel-request-card.component';

describe('TravelRequestCardComponent', () => {
  let component: TravelRequestCardComponent;
  let fixture: ComponentFixture<TravelRequestCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelRequestCardComponent]
    });
    fixture = TestBed.createComponent(TravelRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
