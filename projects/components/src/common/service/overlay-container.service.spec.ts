import { TestBed } from '@angular/core/testing';

import { OverlayContainerService } from './overlay-container.service';

describe('OverlayContainerService', () => {
  let service: OverlayContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
