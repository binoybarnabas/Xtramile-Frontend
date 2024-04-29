import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdiemCardComponent } from './perdiem-card.component';

describe('PerdiemCardComponent', () => {
  let component: PerdiemCardComponent;
  let fixture: ComponentFixture<PerdiemCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerdiemCardComponent]
    });
    fixture = TestBed.createComponent(PerdiemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
