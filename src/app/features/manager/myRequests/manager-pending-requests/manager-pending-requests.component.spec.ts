import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPendingRequestsComponent } from './manager-pending-requests.component';

describe('ManagerPendingRequestsComponent', () => {
  let component: ManagerPendingRequestsComponent;
  let fixture: ComponentFixture<ManagerPendingRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerPendingRequestsComponent]
    });
    fixture = TestBed.createComponent(ManagerPendingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
