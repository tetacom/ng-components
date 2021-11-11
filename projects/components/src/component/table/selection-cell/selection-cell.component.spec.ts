import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionCellComponent } from './selection-cell.component';

describe('SelectionCellComponent', () => {
  let component: SelectionCellComponent;
  let fixture: ComponentFixture<SelectionCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
