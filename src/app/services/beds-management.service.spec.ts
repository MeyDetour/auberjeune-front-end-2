import { TestBed } from '@angular/core/testing';

import { BedsManagementService } from './beds-management.service';

describe('BedsManagementService', () => {
  let service: BedsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BedsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
