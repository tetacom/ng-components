import { TestBed } from '@angular/core/testing';

import { PickerTouchService } from './picker-touch.service';

describe('PickerTouchService', () => {
  let service: PickerTouchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickerTouchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
