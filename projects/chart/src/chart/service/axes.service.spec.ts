import { TestBed } from '@angular/core/testing';

import { AxesService } from './axes.service';

describe('AxesService', () => {
  let service: AxesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
