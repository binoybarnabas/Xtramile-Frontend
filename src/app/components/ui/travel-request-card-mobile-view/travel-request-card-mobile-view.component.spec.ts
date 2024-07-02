import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequestCardMobileViewComponent } from './travel-request-card-mobile-view.component';

describe('TravelRequestCardMobileViewComponent', () => {
  let component: TravelRequestCardMobileViewComponent;
  let fixture: ComponentFixture<TravelRequestCardMobileViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelRequestCardMobileViewComponent]
    });
    fixture = TestBed.createComponent(TravelRequestCardMobileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
