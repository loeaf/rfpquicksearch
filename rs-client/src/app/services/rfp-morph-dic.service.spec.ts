import { TestBed } from '@angular/core/testing';

import { RfpMorphDicService } from './rfp-morph-dic.service';

describe('RfpMorphDicService', () => {
  let service: RfpMorphDicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RfpMorphDicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
