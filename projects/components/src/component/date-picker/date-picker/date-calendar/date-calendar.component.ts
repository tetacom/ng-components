import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output, SimpleChanges,
} from '@angular/core';
import dayjs from 'dayjs';
import { combineLatest, filter, map, takeWhile } from 'rxjs';

import { viewType } from '../../../../common/model/view-type.model';
import { BaseCalendar } from '../../base-calendar';
import { DayModel } from '../../model/day-model';
import {TetaLocalisation} from "../../../../locale/teta-localisation";

@Component({
  selector: 'teta-date-calendar',
  templateUrl: './date-calendar.component.html',
  styleUrls: ['./date-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateCalendarComponent
  extends BaseCalendar
  implements OnChanges, OnDestroy {
  @Input() selectedDate: Date | string | number = new Date();
  @Input() open: boolean;
  @Input() locale:TetaLocalisation
  @Input() viewType: viewType;
  @Input() min: Date | string | number;
  @Input() isDateNull: boolean;
  @Input() max: Date | string | number;
  @Output() setDate: EventEmitter<Date> = new EventEmitter<Date>();
  public calendar: DayModel[] = [];

  constructor(override _cdr: ChangeDetectorRef) {
    super(_cdr);
    combineLatest([this.currentYear, this.currentMonth, this.minMax])
      .pipe(
        takeWhile(() => this.alive),
        filter(
          ([currentYear, currentMonth]) =>
            currentMonth !== null && currentYear !== null
        ),
        map(([year, month, minMax]) => {
          return this.generateCalendar(
            dayjs(new Date(this.selectedDate)).locale('ru', { weekStart: 1 }),
            year,
            month,
            minMax
          );
        })
      )
      .subscribe(_ => {
        this.calendar = _;
      });
  }

}
