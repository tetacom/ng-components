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
import { AsyncPipe } from '@angular/common';
import { YearPickerComponent } from '../../year-picker/year-picker.component';
import { MonthPickerComponent } from '../../month-picker/month-picker.component';
import { DayPickerComponent } from '../../day-picker/day-picker.component';
import { IconComponent } from '../../../icon/icon/icon.component';
import { ButtonComponent } from '../../../button/button/button.component';

@Component({
    selector: 'teta-date-calendar',
    templateUrl: './date-calendar.component.html',
    styleUrls: ['./date-calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ButtonComponent,
        IconComponent,
        DayPickerComponent,
        MonthPickerComponent,
        YearPickerComponent,
        AsyncPipe,
    ],
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
