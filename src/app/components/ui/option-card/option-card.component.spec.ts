import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionCardComponent } from './option-card.component';

describe('OptionCardComponent', () => {
  let component: OptionCardComponent;
  let fixture: ComponentFixture<OptionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionCardComponent]
    });
    fixture = TestBed.createComponent(OptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
