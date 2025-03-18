import { TestBed } from '@angular/core/testing';

import { SuccesHandlerService } from './succes-handler.service';

describe('SuccesHandlerService', () => {
  let service: SuccesHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccesHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
