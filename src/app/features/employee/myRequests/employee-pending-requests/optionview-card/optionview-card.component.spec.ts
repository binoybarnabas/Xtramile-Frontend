import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionviewCardComponent } from './optionview-card.component';

describe('OptionviewCardComponent', () => {
  let component: OptionviewCardComponent;
  let fixture: ComponentFixture<OptionviewCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionviewCardComponent]
    });
    fixture = TestBed.createComponent(OptionviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
