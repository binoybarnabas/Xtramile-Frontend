import { TestBed } from '@angular/core/testing';

import { ManagerTravelRequestsService } from './manager-travel-requests.service';

describe('ManagerTravelRequestsService', () => {
  let service: ManagerTravelRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerTravelRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
