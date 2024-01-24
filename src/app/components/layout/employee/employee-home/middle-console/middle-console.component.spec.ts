import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleConsoleComponent } from './middle-console.component';

describe('MiddleConsoleComponent', () => {
  let component: MiddleConsoleComponent;
  let fixture: ComponentFixture<MiddleConsoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiddleConsoleComponent]
    });
    fixture = TestBed.createComponent(MiddleConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
