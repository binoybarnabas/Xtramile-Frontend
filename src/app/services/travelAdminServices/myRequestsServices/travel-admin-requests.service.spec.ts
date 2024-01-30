import { TestBed } from '@angular/core/testing';

import { TravelAdminRequestsService } from './travel-admin-requests.service';

describe('TravelAdminRequestsService', () => {
  let service: TravelAdminRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelAdminRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
