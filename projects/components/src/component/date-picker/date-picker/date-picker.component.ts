import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  maskitoDateOptionsGenerator,
  maskitoDateTimeOptionsGenerator,
} from '@maskito/kit';
import dayjs from 'dayjs';
import { lastValueFrom, ReplaySubject, take } from 'rxjs';

import { Align } from '../../../common/enum/align.enum';
import { VerticalAlign } from '../../../common/enum/vertical-align.enum';
import { viewType } from '../../../common/model/view-type.model';
import { BasePicker } from '../base-picker';
import { DatePeriod } from '../model/date-period';
import { TetaConfigService } from '../../../locale/teta-config.service';

export const DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true,
};

@Component({
  selector: 'teta-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DATE_PICKER_CONTROL_VALUE_ACCESSOR, DatePipe],
})
export class DatePickerComponent
  extends BasePicker
  implements OnInit, ControlValueAccessor
{
  @Input() date: Date | string | number = null;
  @Input() locale: 'en' | 'ru' = 'ru';
  @Input() showTime = false;
  @Input() minDate: Date | string | number = null;
  @Input() maxDate: Date | string | number = null;
  @Input() invalid = false;
  @Input() disabled = false;
  @Input() align: Align = Align.left;
  @Input() verticalAlign: VerticalAlign = VerticalAlign.auto;
  @Input() viewType: viewType = 'rounded';
  @Input() appendToBody: boolean;
  @Input() backdrop = false;
  @Input() allowNull = true;

  @Input() firstDayOfWeek = 1;
  @Input() disabledDates: Date[];
  @Input() disabledPeriods: DatePeriod[];
  @Input() disabledDays: number[];
  @Input() minYearDate: Date;
  @Input() maxYearDate: Date;

  @ViewChild('input') input: ElementRef;
  @Output() selectDate: EventEmitter<Date> = new EventEmitter<Date>();
  public selectedDate: ReplaySubject<Date | string | number> =
    new ReplaySubject<Date | string | number>(1);
  public mask = '';

  @HostBinding('class.datepicker') private readonly classDatepicker = true;
  @HostBinding('tabindex') private readonly tabindex = 0;

  constructor(
    override _elementRef: ElementRef,
    override _cdr: ChangeDetectorRef,
    override datePipe: DatePipe,
    private localeService: TetaConfigService
  ) {
    super(_elementRef, _cdr, datePipe);
  }

  ngOnInit(): void {
    if (!this.date) {
      this.setDate(this.allowNull ? null : new Date());
      this.date = this.allowNull ? null : new Date();
    } else {
      this.setDate(new Date(this.date));
    }
    this.prepareInput();
  }

  async prepareInput() {
    const config = await lastValueFrom(this.localeService.locale.pipe(take(1)));
    const str = this.date ? this.getLocaleString(this.date) : '';
    let option;
    const setMinMax = () => {
      if (this.minDate) {
        option.min = dayjs(new Date(this.minDate)).startOf('day');
      }
      if (this.maxDate) {
        option.max = dayjs(new Date(this.maxDate)).endOf('day');
      }
    };
    if (this.showTime) {
      this.mask = config.dateTimeMask;
      option = {
        dateMode: 'dd/mm/yyyy',
        timeMode: 'HH:MM',
        dateSeparator: '.',
      };
      setMinMax();
      this.maskitoOptions = maskitoDateTimeOptionsGenerator(option);
    } else {
      this.mask = config.dateMask;
      option = {
        mode: 'dd/mm/yyyy',
        separator: '.',
      };
      setMinMax();
      this.maskitoOptions = maskitoDateOptionsGenerator(option);
    }
    this.changePlaceholder(str);
  }

  onBlur() {
    if (this.allowNull && this.inputText.trim() === '') {
      this.setDate(null);
      this.emitValue(null);
    } else {
      const val = this.inputText.split(',');
      const { day, year, month } = this.getDateFromStr(val[0]);
      const { mins, hours } = this.getTimeFromStr(val[1]);
      if (day && year && month) {
        let date = new Date(year, month - 1, day);
        if (this.showTime) {
          date = new Date(date.setHours(hours || 0, mins || 0));
        }
        this.changeSelectedDate(
          this.getAvailableDate(this.minDate, this.maxDate, date)
        );
      } else {
        this.setDate(this.date);
      }
    }
  }

  setDate(date) {
    if (!date && this.allowNull) {
      this.inputText = '';
      this.changePlaceholder('');
      this.selectedDate.next(new Date(this.minDate || new Date()));
    } else {
      this.inputText = this.getLocaleString(date);
      this.changePlaceholder(this.getLocaleString(date));
      this.selectedDate.next(date);
    }
  }

  onChange(date: Date) {}

  registerOnChange(fn: (date: Date) => any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(obj: Date | string | number): void {
    if (obj) {
      this.date = new Date(obj);
      this.setDate(new Date(this.date));
    } else {
      if (this.allowNull) {
        this.date = null;
        this.selectedDate.next(null);
      } else {
        this.date = this.minDate || new Date();
        this.selectedDate.next(this.minDate || new Date());
      }
    }
  }
}
