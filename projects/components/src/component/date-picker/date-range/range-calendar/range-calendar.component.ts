import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import dayjs from 'dayjs';
import { combineLatest, filter, map, shareReplay, takeWhile } from 'rxjs';

import { viewType } from '../../../../common/model/view-type.model';
import { BaseCalendar } from '../../base-calendar';
import { DayModel } from '../../model/day-model';
import { DateFromToModel } from '../../model/from-to.model';
import { TetaLocalisation } from '../../../../locale/teta-localisation';
import { YearPickerComponent } from '../../year-picker/year-picker.component';
import { MonthPickerComponent } from '../../month-picker/month-picker.component';
import { DayPickerComponent } from '../../day-picker/day-picker.component';
import { IconComponent } from '../../../icon/icon/icon.component';
import { NgClass, AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../../../button/button/button.component';

@Component({
  selector: 'teta-range-calendar',
  templateUrl: './range-calendar.component.html',
  styleUrls: ['./range-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ButtonComponent,
    NgClass,
    IconComponent,
    DayPickerComponent,
    MonthPickerComponent,
    YearPickerComponent,
    AsyncPipe,
  ],
})
export class RangeCalendarComponent extends BaseCalendar implements OnChanges, OnDestroy {
  @Input() locale: TetaLocalisation;
  @Input() open: boolean;
  @Input() date: DateFromToModel;
  @Input() viewType: viewType;
  @Input() allowNull = true;
  @Input() selectedDate: DateFromToModel;
  @Input() min: Date | string | number;
  @Input() isDateNull: boolean;
  @Input() max: Date | string | number;
  @Output() hoveredDateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() setDate: EventEmitter<Date> = new EventEmitter<Date>();
  public calendar: { currentMonth: DayModel[]; nextMonth: DayModel[] };
  public _hoveredDate: Date = null;
  get hoveredDate() {
    return this._hoveredDate;
  }

  set hoveredDate(e) {
    this._hoveredDate = e;
    this._cdr.detectChanges();
  }

  constructor(override _cdr: ChangeDetectorRef) {
    super(_cdr);
    combineLatest([this.currentYear, this.currentMonth, this.minMax])
      .pipe(
        takeWhile(() => this.alive),
        shareReplay({ bufferSize: 1, refCount: false }),
        filter(([currentYear, currentMonth]) => currentMonth !== null && currentYear !== null),
        map(([year, month, minMax]) => {
          const { availableYear, availableMonth } = this.getAvailableMonthYear(month + 1, year);
          return {
            currentMonth: this.generateCalendar(
              dayjs(new Date(this.selectedDate.from || new Date())).locale('ru', { weekStart: 1 }),
              year,
              month,
              minMax,
            ),
            nextMonth: this.generateCalendar(
              dayjs(new Date(this.selectedDate.from || new Date())).locale('ru', { weekStart: 1 }),
              availableYear,
              availableMonth,
              minMax,
            ),
          };
        }),
      )
      .subscribe((_) => {
        this.calendar = _;
      });
  }

  getFromTo() {
    let dateFrom;
    let dateTo;
    if (this.selectedDate?.from) {
      dateFrom = new Date(this.selectedDate.from);
      dateTo = null;
    } else {
      if (this.allowNull) {
        dateFrom = this.date?.from ? new Date(this.date.from) : null;
        dateTo = this.date?.to ? new Date(this.date.to) : null;
      } else {
        dateFrom = this.date?.from ? new Date(this.date.from) : new Date();
        dateTo = this.date?.to ? new Date(this.date.to) : new Date();
      }
    }

    return { from: dateFrom, to: dateTo };
  }

  override isSelected(d: Date, selectedDate: Date) {
    const { from, to } = this.getFromTo();
    return this.checkSelected(d, from) || this.checkSelected(d, to);
  }

  checkSelected(date: Date, selectedDate: Date) {
    const isSelectedDate = date.getDate() === selectedDate?.getDate();
    const isSelectedYear = date.getFullYear() === selectedDate?.getFullYear();
    const isSelectedMonth = date.getMonth() === selectedDate?.getMonth();
    return isSelectedDate && isSelectedMonth && isSelectedYear;
  }

  isFirstDaySuitable(m: number, y: number, max: string | number | Date) {
    const { availableYear, availableMonth } = this.getAvailableMonthYear(m, y);
    return this.isSuitableMaxDate(dayjs(new Date(availableYear, availableMonth)).startOf('month').toDate(), max);
  }

  isLastDaySuitable(m: number, y: number, min: string | number | Date) {
    const { availableYear, availableMonth } = this.getAvailableMonthYear(m, y);
    return this.isSuitableMinDate(dayjs(new Date(availableYear, availableMonth)).endOf('month').toDate(), min);
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.['hoveredDate']) {
      this.changeCalendarData(this.selectedDate.from || this.date.from);
    }
  }
}
