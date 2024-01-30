import { TestBed } from '@angular/core/testing';

import { TravelAdminSettlementsService } from './travel-admin-settlements.service';

describe('TravelAdminSettlementsService', () => {
  let service: TravelAdminSettlementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelAdminSettlementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
