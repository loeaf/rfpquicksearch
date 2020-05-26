import { TestBed } from '@angular/core/testing';

import { RfpSerchService } from './rfp-serch.service';

describe('RfpSerchService', () => {
  let service: RfpSerchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RfpSerchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
