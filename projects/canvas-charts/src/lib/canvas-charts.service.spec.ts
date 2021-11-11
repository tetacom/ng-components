import { TestBed } from '@angular/core/testing';

import { CanvasChartsService } from './canvas-charts.service';

describe('CanvasChartsService', () => {
  let service: CanvasChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
