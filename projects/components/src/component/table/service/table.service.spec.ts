import { TestBed } from '@angular/core/testing';

import { TableService } from './table.service';

describe('TableService', () => {
  let service: TableService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
