import { TestBed } from '@angular/core/testing';

import { CustomLoaderService } from './custom-loader.service';

describe('CustomLoaderService', () => {
  let service: CustomLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
