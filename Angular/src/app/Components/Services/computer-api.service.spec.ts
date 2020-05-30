import { TestBed } from '@angular/core/testing';

import { ComputerAPIService } from './computer-api.service';

describe('ComputerAPIService', () => {
  let service: ComputerAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComputerAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
