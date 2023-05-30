import { TestBed } from '@angular/core/testing';

import { CompartilharService } from './compartilhar.service';

describe('CompartilharService', () => {
  let service: CompartilharService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompartilharService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
