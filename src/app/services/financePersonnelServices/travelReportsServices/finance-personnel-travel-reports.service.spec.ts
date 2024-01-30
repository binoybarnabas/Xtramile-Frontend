import { TestBed } from '@angular/core/testing';

import { FinancePersonnelTravelReportsService } from './finance-personnel-travel-reports.service';

describe('FinancePersonnelTravelReportsService', () => {
  let service: FinancePersonnelTravelReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancePersonnelTravelReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
