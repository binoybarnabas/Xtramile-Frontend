import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTravelHistoryComponent } from './manager-travel-history.component';

describe('ManagerTravelHistoryComponent', () => {
  let component: ManagerTravelHistoryComponent;
  let fixture: ComponentFixture<ManagerTravelHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerTravelHistoryComponent]
    });
    fixture = TestBed.createComponent(ManagerTravelHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
