import { DatePipe, NgClass, AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { maskitoDateOptionsGenerator, maskitoDateTimeOptionsGenerator } from '@maskito/kit';
import dayjs from 'dayjs';
import { lastValueFrom, Observable, ReplaySubject, take } from 'rxjs';

import { Align } from '../../../common/enum/align.enum';
import { VerticalAlign } from '../../../common/enum/vertical-align.enum';
import { viewType } from '../../../common/model/view-type.model';
import { BasePicker } from '../base-picker';
import { DatePeriod } from '../model/date-period';
import { TetaConfigService } from '../../../locale/teta-config.service';
import { TetaLocalisation } from '../../../locale/teta-localisation';
import { DateCalendarComponent } from './date-calendar/date-calendar.component';
import { DropdownContentDirective } from '../../dropdown/dropdown-content.directive';
import { IconComponent } from '../../icon/icon/icon.component';
import { MaskitoModule } from '@maskito/angular';
import { InputComponent } from '../../input/input/input.component';
import { DropdownHeadDirective } from '../../dropdown/dropdown-head.directive';
import { DropdownComponent } from '../../dropdown/dropdown/dropdown.component';

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
  standalone: true,
  imports: [
    DropdownComponent,
    DropdownHeadDirective,
    NgClass,
    InputComponent,
    FormsModule,
    MaskitoModule,
    IconComponent,
    DropdownContentDirective,
    DateCalendarComponent,
    AsyncPipe,
  ],
})
export class DatePickerComponent extends BasePicker implements OnInit, ControlValueAccessor, OnChanges {
  @Input() date: Date | string | number = null;
  public locale: Observable<TetaLocalisation>;
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
  public selectedDate: ReplaySubject<Date | string | number> = new ReplaySubject<Date | string | number>(1);
  public mask = '';
  @HostBinding('class.datepicker') private readonly classDatepicker = true;
  @HostBinding('class.datepicker-time') get dateTimeClass() {
    return this.showTime;
  }
  @HostBinding('tabindex') private readonly tabindex = 0;

  constructor(
    override _elementRef: ElementRef,
    override _cdr: ChangeDetectorRef,
    override datePipe: DatePipe,
    private localeService: TetaConfigService,
  ) {
    super(_elementRef, _cdr, datePipe);
    this.locale = this.localeService.locale;
  }

  ngOnInit(): void {
    if (!this.date) {
      this.setDate(this.allowNull ? null : new Date());
      this.date = this.allowNull ? null : new Date();
    } else {
      this.setDate(new Date(this.date));
    }
    this.prepareInput(true);
  }

  async prepareInput(isFirstRender?: boolean) {
    const config = await lastValueFrom(this.localeService.locale.pipe(take(1)));
    const str = this.date ? this.getLocaleString(this.date) : '';
    let option;
    const setMinMax = () => {
      if (this.minDate && !isFirstRender) {
        option.min = dayjs(new Date(this.minDate)).startOf('day');
      }
      if (this.maxDate && !isFirstRender) {
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
        this.changeSelectedDate(this.getAvailableDate(this.minDate, this.maxDate, date));
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

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.prepareInput(false);
  }
}
