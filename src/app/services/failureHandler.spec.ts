import { TestBed } from '@angular/core/testing';

import { FailureHandler } from './failureHandler';

describe('ErrorService', () => {
  let service: FailureHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FailureHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
