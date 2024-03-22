import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerForwadedRequestsComponent } from './manager-forwaded-requests.component';

describe('ManagerForwadedRequestsComponent', () => {
  let component: ManagerForwadedRequestsComponent;
  let fixture: ComponentFixture<ManagerForwadedRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerForwadedRequestsComponent]
    });
    fixture = TestBed.createComponent(ManagerForwadedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
