import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DateCellComponent} from './date-cell.component';

describe('DateCellComponent', () => {
  let component: DateCellComponent<any>;
  let fixture: ComponentFixture<DateCellComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateCellComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
