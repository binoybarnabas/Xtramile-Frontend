import { TestBed } from '@angular/core/testing';

import { FinancePersonnelRequestsService } from './finance-personnel-requests.service';

describe('FinancePersonnelRequestsService', () => {
  let service: FinancePersonnelRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancePersonnelRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
