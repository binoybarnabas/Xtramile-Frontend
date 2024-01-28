import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerMiddleConsoleComponent } from './manager-middle-console.component';

describe('ManagerMiddleConsoleComponent', () => {
  let component: ManagerMiddleConsoleComponent;
  let fixture: ComponentFixture<ManagerMiddleConsoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerMiddleConsoleComponent]
    });
    fixture = TestBed.createComponent(ManagerMiddleConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
