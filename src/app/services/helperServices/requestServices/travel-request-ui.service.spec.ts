import { TestBed } from '@angular/core/testing';

import { TravelRequestUiService } from './travel-request-ui.service';

describe('TravelRequestUiService', () => {
  let service: TravelRequestUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelRequestUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
