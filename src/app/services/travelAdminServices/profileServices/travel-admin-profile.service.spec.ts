import { TestBed } from '@angular/core/testing';

import { TravelAdminProfileService } from './travel-admin-profile.service';

describe('TravelAdminProfileService', () => {
  let service: TravelAdminProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelAdminProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
