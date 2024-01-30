import { TestBed } from '@angular/core/testing';

import { FinancePersonnelTravelSettlementsService } from './finance-personnel-travel-settlements.service';

describe('FinancePersonnelTravelSettlementsService', () => {
  let service: FinancePersonnelTravelSettlementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancePersonnelTravelSettlementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
