import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NumericCellComponent} from './numeric-cell.component';

describe('NumericCellComponent', () => {
  let component: NumericCellComponent<any>;
  let fixture: ComponentFixture<NumericCellComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumericCellComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
