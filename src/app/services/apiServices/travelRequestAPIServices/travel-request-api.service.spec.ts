import { TestBed } from '@angular/core/testing';

import { TravelRequestApiService } from './travel-request-api.service';

describe('TravelRequestApiService', () => {
  let service: TravelRequestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelRequestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
