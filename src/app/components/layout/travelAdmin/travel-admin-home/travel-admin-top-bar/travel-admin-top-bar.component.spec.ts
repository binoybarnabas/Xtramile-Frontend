import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdminTopBarComponent } from './travel-admin-top-bar.component';

describe('TravelAdminTopBarComponent', () => {
  let component: TravelAdminTopBarComponent;
  let fixture: ComponentFixture<TravelAdminTopBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelAdminTopBarComponent]
    });
    fixture = TestBed.createComponent(TravelAdminTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
