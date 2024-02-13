import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequestCardModalComponent } from './travel-request-card-modal.component';

describe('TravelRequestCardModalComponent', () => {
  let component: TravelRequestCardModalComponent;
  let fixture: ComponentFixture<TravelRequestCardModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelRequestCardModalComponent]
    });
    fixture = TestBed.createComponent(TravelRequestCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
