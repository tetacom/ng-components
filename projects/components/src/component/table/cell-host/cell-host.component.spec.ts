import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CellHostComponent} from './cell-host.component';

describe('TableCellWrapperComponent', () => {
  let component: CellHostComponent<any>;
  let fixture: ComponentFixture<CellHostComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellHostComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
