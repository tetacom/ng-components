import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeCellComponent } from './date-time-cell.component';

describe('DateTimeCellComponent', () => {
  let component: DateTimeCellComponent;
  let fixture: ComponentFixture<DateTimeCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateTimeCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
