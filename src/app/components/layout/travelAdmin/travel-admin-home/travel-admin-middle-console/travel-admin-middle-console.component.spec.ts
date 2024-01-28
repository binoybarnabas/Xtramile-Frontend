import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminMiddleConsoleComponent } from './travel-admin-middle-console.component';

describe('TravelAdminMiddleConsoleComponent', () => {
  let component: TravelAdminMiddleConsoleComponent;
  let fixture: ComponentFixture<TravelAdminMiddleConsoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminMiddleConsoleComponent]
    });
    fixture = TestBed.createComponent(TravelAdminMiddleConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
