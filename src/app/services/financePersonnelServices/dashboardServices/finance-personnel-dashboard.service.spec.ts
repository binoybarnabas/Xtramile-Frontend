import { TestBed } from '@angular/core/testing';

import { FinancePersonnelDashboardService } from './finance-personnel-dashboard.service';

describe('FinancePersonnelDashboardService', () => {
  let service: FinancePersonnelDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancePersonnelDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
