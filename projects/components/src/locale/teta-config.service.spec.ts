import { TestBed } from '@angular/core/testing';

import { TetaConfigService } from './teta-config.service';

describe('TableConfigService', () => {
  let service: TetaConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TetaConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
