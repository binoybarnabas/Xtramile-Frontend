import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraveladminReqformComponent } from './traveladmin-reqform.component';

describe('TraveladminReqformComponent', () => {
  let component: TraveladminReqformComponent;
  let fixture: ComponentFixture<TraveladminReqformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraveladminReqformComponent]
    });
    fixture = TestBed.createComponent(TraveladminReqformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
