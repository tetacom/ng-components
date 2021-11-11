import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellComponent } from './cell.component';

describe('TableCellComponent', () => {
  let component: CellComponent<any>;
  let fixture: ComponentFixture<CellComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
