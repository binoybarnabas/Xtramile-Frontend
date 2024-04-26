import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageActionContainerComponent } from './page-action-container.component';

describe('PageActionContainerComponent', () => {
  let component: PageActionContainerComponent;
  let fixture: ComponentFixture<PageActionContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageActionContainerComponent]
    });
    fixture = TestBed.createComponent(PageActionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
