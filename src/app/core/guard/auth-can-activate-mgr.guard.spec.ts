import { TestBed } from '@angular/core/testing';

import { AuthCanActivateMgrGuard } from './auth-can-activate-mgr.guard';

describe('AuthCanActivateMgrGuard', () => {
  let guard: AuthCanActivateMgrGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthCanActivateMgrGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
