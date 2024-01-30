import { TestBed } from '@angular/core/testing';

import { EmployeeSettlementsService } from './employee-settlements.service';

describe('EmployeeSettlementsService', () => {
  let service: EmployeeSettlementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeSettlementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
