import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionCardComponent } from './rejection-card.component';

describe('RejectionCardComponent', () => {
  let component: RejectionCardComponent;
  let fixture: ComponentFixture<RejectionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectionCardComponent]
    });
    fixture = TestBed.createComponent(RejectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
