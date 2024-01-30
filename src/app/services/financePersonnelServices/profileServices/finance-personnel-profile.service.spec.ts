import { TestBed } from '@angular/core/testing';

import { FinancePersonnelProfileService } from './finance-personnel-profile.service';

describe('FinancePersonnelProfileService', () => {
  let service: FinancePersonnelProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancePersonnelProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
