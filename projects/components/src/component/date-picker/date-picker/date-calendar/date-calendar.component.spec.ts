import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCalendarComponent } from './date-calendar.component';

describe('CalendarComponent', () => {
  let component: DateCalendarComponent;
  let fixture: ComponentFixture<DateCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DateCalendarComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(DateCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
