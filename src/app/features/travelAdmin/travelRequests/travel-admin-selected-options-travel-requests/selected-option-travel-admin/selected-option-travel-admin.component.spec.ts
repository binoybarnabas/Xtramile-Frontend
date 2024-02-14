import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedOptionTravelAdminComponent } from './selected-option-travel-admin.component';

describe('SelectedOptionTravelAdminComponent', () => {
  let component: SelectedOptionTravelAdminComponent;
  let fixture: ComponentFixture<SelectedOptionTravelAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedOptionTravelAdminComponent]
    });
    fixture = TestBed.createComponent(SelectedOptionTravelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
