import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedDataTableComponent } from './tabbed-data-table.component';

describe('TabbedDataTableComponent', () => {
  let component: TabbedDataTableComponent;
  let fixture: ComponentFixture<TabbedDataTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabbedDataTableComponent]
    });
    fixture = TestBed.createComponent(TabbedDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
