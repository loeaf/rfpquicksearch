import { TestBed } from '@angular/core/testing';

import { CommonManagerService } from './common-manager.service';

describe('CommonManagerService', () => {
  let service: CommonManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
