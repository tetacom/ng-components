import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';
import {viewType} from "../../../../common/model/view-type.model";

import {BaseCalendar} from "../../base-calendar";
import {DayModel} from "../../model/day-model";
import dayjs from "dayjs";
import {combineLatest, filter, map, takeWhile} from "rxjs";


@Component({
  selector: 'teta-date-calendar',
  templateUrl: './date-calendar.component.html',
  styleUrls: ['./date-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateCalendarComponent extends BaseCalendar implements OnChanges, OnDestroy{
  @Input() selectedDate: Date | string | number = new Date();
  @Input() locale: string;
  @Input() open: boolean;
  @Input() viewType: viewType;
  @Input() min: Date | string | number;
  @Input() isDateNull: boolean;
  @Input() max: Date | string | number;
  @Output() setDate: EventEmitter<Date> = new EventEmitter<Date>();
  public calendar: DayModel[] = []
  constructor(override _cdr: ChangeDetectorRef) {
    super(_cdr)
    dayjs().locale('ru', {weekStart: 1});
    combineLatest([this.currentYear, this.currentMonth, this.minMax]).pipe(
      takeWhile(() => this.alive),
      filter(([currentYear, currentMonth]) => currentMonth !== null && currentYear !== null),
      map(([year, month, minMax]) => {
        return this.generateCalendar(dayjs(new Date(this.selectedDate)).locale(this.locale), year, month, minMax)
      })
    ).subscribe((_) => {
      this.calendar = _;
    })
  }
}
