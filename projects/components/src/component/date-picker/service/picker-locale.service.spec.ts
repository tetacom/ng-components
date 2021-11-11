import { TestBed, inject } from '@angular/core/testing';
import { PickerLocaleService } from './picker-locale.service';

describe('PickerLocaleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PickerLocaleService]
    });
  });

  it('should be created', inject([PickerLocaleService], (service: PickerLocaleService) => {
    expect(service).toBeTruthy();
  }));
});
