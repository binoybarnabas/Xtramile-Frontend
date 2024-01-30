import { TestBed } from '@angular/core/testing';

import { FinancePersonnelSettlementsService } from './finance-personnel-settlements.service';

describe('FinancePersonnelSettlementsService', () => {
  let service: FinancePersonnelSettlementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancePersonnelSettlementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
