import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerClosedTravelSettlementsComponent } from './manager-closed-travel-settlements.component';

describe('ManagerClosedTravelSettlementsComponent', () => {
  let component: ManagerClosedTravelSettlementsComponent;
  let fixture: ComponentFixture<ManagerClosedTravelSettlementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerClosedTravelSettlementsComponent]
    });
    fixture = TestBed.createComponent(ManagerClosedTravelSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
