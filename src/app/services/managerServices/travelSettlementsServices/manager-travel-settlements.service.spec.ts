import { TestBed } from '@angular/core/testing';

import { ManagerTravelSettlementsService } from './manager-travel-settlements.service';

describe('ManagerTravelSettlementsService', () => {
  let service: ManagerTravelSettlementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerTravelSettlementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
