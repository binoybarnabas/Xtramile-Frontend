import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerIncomingTravelSettlementsComponent } from './manager-incoming-travel-settlements.component';

describe('ManagerIncomingTravelSettlementsComponent', () => {
  let component: ManagerIncomingTravelSettlementsComponent;
  let fixture: ComponentFixture<ManagerIncomingTravelSettlementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerIncomingTravelSettlementsComponent]
    });
    fixture = TestBed.createComponent(ManagerIncomingTravelSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
