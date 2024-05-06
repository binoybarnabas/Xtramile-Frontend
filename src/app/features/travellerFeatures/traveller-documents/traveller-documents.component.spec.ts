import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerDocumentsComponent } from './traveller-documents.component';

describe('TravellerDocumentsComponent', () => {
  let component: TravellerDocumentsComponent;
  let fixture: ComponentFixture<TravellerDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravellerDocumentsComponent]
    });
    fixture = TestBed.createComponent(TravellerDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
