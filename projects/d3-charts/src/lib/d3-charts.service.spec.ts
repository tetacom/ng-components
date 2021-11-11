import { TestBed } from '@angular/core/testing';

import { D3ChartsService } from './d3-charts.service';

describe('D3ChartsService', () => {
  let service: D3ChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(D3ChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
