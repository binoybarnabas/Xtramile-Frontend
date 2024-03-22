import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequestFormComponent } from './travel-request-form.component';

describe('TravelRequestFormComponent', () => {
  let component: TravelRequestFormComponent;
  let fixture: ComponentFixture<TravelRequestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelRequestFormComponent]
    });
    fixture = TestBed.createComponent(TravelRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
