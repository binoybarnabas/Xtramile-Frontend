import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAvailableOptionsComponent } from './view-available-options.component';

describe('ViewAvailableOptionsComponent', () => {
  let component: ViewAvailableOptionsComponent;
  let fixture: ComponentFixture<ViewAvailableOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAvailableOptionsComponent]
    });
    fixture = TestBed.createComponent(ViewAvailableOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
