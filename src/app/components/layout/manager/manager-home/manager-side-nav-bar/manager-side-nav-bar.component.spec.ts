import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSideNavBarComponent } from './manager-side-nav-bar.component';

describe('ManagerSideNavBarComponent', () => {
  let component: ManagerSideNavBarComponent;
  let fixture: ComponentFixture<ManagerSideNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerSideNavBarComponent]
    });
    fixture = TestBed.createComponent(ManagerSideNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
