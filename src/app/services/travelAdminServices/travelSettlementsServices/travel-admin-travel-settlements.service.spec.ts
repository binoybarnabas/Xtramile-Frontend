import { TestBed } from '@angular/core/testing';

import { TravelAdminTravelSettlementsService } from './travel-admin-travel-settlements.service';

describe('TravelAdminTravelSettlementsService', () => {
  let service: TravelAdminTravelSettlementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelAdminTravelSettlementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
