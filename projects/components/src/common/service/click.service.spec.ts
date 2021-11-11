import { TestBed } from '@angular/core/testing';

import { ClickService } from './click.service';

describe('ClickServiceService', () => {
  let service: ClickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
