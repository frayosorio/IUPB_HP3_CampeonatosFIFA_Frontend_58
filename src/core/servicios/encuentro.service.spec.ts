import { TestBed } from '@angular/core/testing';

import { EncuentroService } from './encuentro.service';

describe('EncuentroService', () => {
  let service: EncuentroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncuentroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
