import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarUserComponent } from './top-bar-user.component';

describe('TopBarUserComponent', () => {
  let component: TopBarUserComponent;
  let fixture: ComponentFixture<TopBarUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopBarUserComponent]
    });
    fixture = TestBed.createComponent(TopBarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
