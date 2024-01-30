import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerOngoingTravelComponent } from './manager-ongoing-travel.component';

describe('ManagerOngoingTravelComponent', () => {
  let component: ManagerOngoingTravelComponent;
  let fixture: ComponentFixture<ManagerOngoingTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerOngoingTravelComponent]
    });
    fixture = TestBed.createComponent(ManagerOngoingTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
