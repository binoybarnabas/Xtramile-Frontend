import { TestBed } from '@angular/core/testing';

import { ManagerRequestsService } from './manager-requests.service';

describe('ManagerRequestsService', () => {
  let service: ManagerRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
