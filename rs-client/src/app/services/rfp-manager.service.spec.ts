import { TestBed } from '@angular/core/testing';

import { RfpManagerService } from './rfp-manager.service';

describe('RfpManagerService', () => {
  let service: RfpManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RfpManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
