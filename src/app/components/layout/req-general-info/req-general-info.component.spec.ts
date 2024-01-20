import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqGeneralInfoComponent } from './req-general-info.component';

describe('ReqGeneralInfoComponent', () => {
  let component: ReqGeneralInfoComponent;
  let fixture: ComponentFixture<ReqGeneralInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReqGeneralInfoComponent]
    });
    fixture = TestBed.createComponent(ReqGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
