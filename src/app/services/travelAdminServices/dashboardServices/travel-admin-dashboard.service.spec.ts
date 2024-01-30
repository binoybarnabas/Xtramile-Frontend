import { TestBed } from '@angular/core/testing';

import { TravelAdminDashboardService } from './travel-admin-dashboard.service';

describe('TravelAdminDashboardService', () => {
  let service: TravelAdminDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelAdminDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
