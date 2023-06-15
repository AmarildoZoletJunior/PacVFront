import { TestBed } from '@angular/core/testing';

import { GuardaTestGuard } from './guarda-test.guard';

describe('GuardaTestGuard', () => {
  let guard: GuardaTestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardaTestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
