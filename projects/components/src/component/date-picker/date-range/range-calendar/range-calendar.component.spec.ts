import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeCalendarComponent } from './range-calendar.component';

describe('CalendarComponent', () => {
  let component: RangeCalendarComponent;
  let fixture: ComponentFixture<RangeCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RangeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
