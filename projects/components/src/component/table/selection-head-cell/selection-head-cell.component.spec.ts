import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectionHeadCellComponent} from './selection-head-cell.component';

describe('SelectionHeadCellComponent', () => {
  let component: SelectionHeadCellComponent<any>;
  let fixture: ComponentFixture<SelectionHeadCellComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SelectionHeadCellComponent]
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionHeadCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
