import { TestBed } from '@angular/core/testing';

import { OpcionalService } from './opcional.service';

describe('OpcionalService', () => {
  let service: OpcionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpcionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
