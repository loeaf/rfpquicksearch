import { TestBed } from '@angular/core/testing';

import { PrjManagerService } from './prj-manager.service';

describe('PrjManagerService', () => {
  let service: PrjManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrjManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
