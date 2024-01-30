import { TestBed } from '@angular/core/testing';

import { TravelAdminTravelRequestsService } from './travel-admin-travel-requests.service';

describe('TravelAdminTravelRequestsService', () => {
  let service: TravelAdminTravelRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelAdminTravelRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
