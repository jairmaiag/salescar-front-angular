import { TestBed } from '@angular/core/testing';

import { FrabricanteService } from './service/frabricante.service';

describe('FrabricanteService', () => {
  let service: FrabricanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrabricanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
