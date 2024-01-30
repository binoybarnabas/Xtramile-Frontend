import { TestBed } from '@angular/core/testing';

import { ManagerSettlementsService } from './manager-settlements.service';

describe('ManagerSettlementsService', () => {
  let service: ManagerSettlementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerSettlementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
