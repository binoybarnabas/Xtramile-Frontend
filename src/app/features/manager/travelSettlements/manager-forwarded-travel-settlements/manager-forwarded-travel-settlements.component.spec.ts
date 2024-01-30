import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerForwardedTravelSettlementsComponent } from './manager-forwarded-travel-settlements.component';

describe('ManagerForwardedTravelSettlementsComponent', () => {
  let component: ManagerForwardedTravelSettlementsComponent;
  let fixture: ComponentFixture<ManagerForwardedTravelSettlementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerForwardedTravelSettlementsComponent]
    });
    fixture = TestBed.createComponent(ManagerForwardedTravelSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
