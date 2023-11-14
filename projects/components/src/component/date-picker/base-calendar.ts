import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

import { viewType } from '../../common/model/view-type.model';
import { DayModel } from './model/day-model';
import { MinMaxDateModel } from './model/min-max-date.model';
import {TetaLocalisation} from "../../locale/teta-localisation";

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseCalendar implements OnChanges, OnDestroy {
  abstract selectedDate;
  abstract locale: TetaLocalisation;
  abstract open: boolean;
  abstract viewType: viewType;
  abstract min: Date | string | number;
  abstract isDateNull: boolean;
  abstract max: Date | string | number;
  abstract setDate: EventEmitter<Date>;
  public currentMonth: ReplaySubject<number> = new ReplaySubject<number>(1);
  public minMax: ReplaySubject<MinMaxDateModel> =
    new ReplaySubject<MinMaxDateModel>(1);
  public currentYear: ReplaySubject<number> = new ReplaySubject<number>(1);
  public selectedPicker: BehaviorSubject<'day' | 'month' | 'year'> =
    new BehaviorSubject<'day' | 'month' | 'year'>('day');
  abstract calendar:
    | DayModel[]
    | { currentMonth: DayModel[]; nextMonth: DayModel[] };

  public alive = true;

  protected constructor(protected _cdr: ChangeDetectorRef) {}

  generateCalendar(
    selectedDate: Dayjs,
    year: number,
    month: number,
    minMax: MinMaxDateModel
  ): DayModel[] {
    const calendarStartDay = selectedDate
      .set('year', year)
      .set('month', month)
      .set('date', 1)
      .startOf('week');
    const calendar = new Array(42).fill(1).map((v, i) => {
      return calendarStartDay.add(i, 'day');
    });
    return calendar.map(d => {
      return new DayModel({
        date: new Date(d.toDate()),
        isCurrentMonth: month === d.month(),
        disabled:
          !this.isSuitableMinDate(d.toDate(), minMax.min) ||
          !this.isSuitableMaxDate(d.toDate(), minMax.max),
        selected: this.isSelected(d.toDate(), selectedDate.toDate()),
      });
    });
  }

  isSuitableMinDate(d: Date, minDate: Date | string | number) {
    return (
      dayjs(new Date(minDate)).startOf('date').toDate() <= new Date(d) ||
      minDate === null
    );
  }

  isSuitableMaxDate(d: Date, maxDate: Date | string | number) {
    return (
      new Date(d) < dayjs(new Date(maxDate)).endOf('date').toDate() ||
      maxDate === null
    );
  }

  isSelected(date: Date, selectedDate: Date) {
    const isSelectedDate = date.getDate() === selectedDate?.getDate();
    const isSelectedYear = date.getFullYear() === selectedDate?.getFullYear();
    const isSelectedMonth = date.getMonth() === selectedDate?.getMonth();
    return (
      isSelectedDate && isSelectedMonth && isSelectedYear && !this.isDateNull
    );
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  selectPicker(entity: 'day' | 'month' | 'year') {
    this.selectedPicker.next(entity);
  }

  selectMonth(month: number) {
    this.currentMonth.next(month);
    this.selectPicker('day');
  }

  selectYear(year: number) {
    this.setYear(year);
    this.selectPicker('day');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeCalendarData(this.selectedDate);
    if(changes['open']){
      this.selectedPicker.next('day')
    }
  }

  changeCalendarData(selectedDate: Date | number | string) {
    const date = new Date(selectedDate || new Date());
    this.currentMonth.next(new Date(date).getMonth());
    this.currentYear.next(new Date(date).getFullYear());
    this.minMax.next({ min: this.min, max: this.max });
  }

  setYear(year: number) {
    this.currentYear.next(year);
  }

  changeMonth(month: number, year: number) {
    const { availableYear, availableMonth } = this.getAvailableMonthYear(
      month,
      year
    );
    this.currentMonth.next(availableMonth);
    this.currentYear.next(availableYear);
  }

  getAvailableMonthYear(month: number, year: number) {
    if (month > 11) {
      return { availableMonth: month - 12, availableYear: year + 1 };
    }
    if (month < 0) {
      return { availableMonth: 12 + month, availableYear: year - 1 };
    }
    return { availableMonth: month, availableYear: year };
  }

  getMothName(month: number) {
    return this.locale.months[month];
  }

  selectDate(date: Date) {
    this.setDate.emit(date);
  }
  scrollMonth = (e: any, month: number, year: number) => {
    const delta = e?.deltaY ?? e;
    if (e instanceof WheelEvent) {
      e.preventDefault();
    }
    if (delta > 0) {
      this.changeMonth(month - 1, year);
    } else {
      this.changeMonth(month + 1, year);
    }
  };
}
