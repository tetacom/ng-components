import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {takeWhile} from 'rxjs/operators';
import {DatePeriod} from '../model/date-period';
import {DatePickerMode} from '../model/date-picker-mode.enum';
import {DateUtil} from '../../../util/date-util';
import {DatePickerUtil} from '../util/date-picker-util';
import {Align} from '../../../common/enum/align.enum';
import {VerticalAlign} from '../../../common/enum/vertical-align.enum';
import {TetaLocalisation} from '../../../locale/teta-localisation';
import {TetaConfigService} from '../../../locale/teta-config.service';

export const DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true,
};

@Component({
  selector: 'teta-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [DATE_PICKER_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() disabled: boolean;
  @Input() invalid: boolean;
  @Input() firstDayOfWeek = 1;
  @Input() disabledDates: Date[];
  @Input() disabledPeriods: DatePeriod[];
  @Input() disabledDays: number[];
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() minYearDate: Date;
  @Input() maxYearDate: Date;
  @Input() align: Align = Align.left;
  @Input() verticalAlign: VerticalAlign = VerticalAlign.auto;
  @Input() appendToBody: boolean;
  @Input() allowNull = true;

  @HostBinding('class.datepicker-wide')
  @Input()
  showTime = false;

  @Input()
  set format(val: string) {
    this._format = val;
  }

  get format(): string {
    if (this._format) {
      return this._format;
    }
    return this.showTime ? 'dd.MM.yyyy HH:mm:ss' : 'dd.MM.yyyy';
  }

  @HostBinding('class.datepicker_open') open: boolean;
  @HostBinding('class.datepicker') private readonly classDatepicker = true;
  @HostBinding('tabindex') private readonly tabindex = 0;

  locale: TetaLocalisation;
  today: Date = new Date();

  datePickerModeEnum = DatePickerMode;
  displayMode: DatePickerMode = DatePickerMode.date;
  _format: string;

  _value: Date | null = null;
  _currentValue: Date;

  private _alive = true;

  get value(): Date | null {
    return this._value;
  }

  set value(v: Date | null) {
    if (v?.getTime() !== this._value?.getTime()) {
      this._value = v;
      this.currentValue = this._value;
    }
  }

  get currentValue(): Date {
    return this._currentValue;
  }

  set currentValue(date: Date) {
    this._currentValue = date;
    this._cdr.markForCheck();
  }

  get internalValue() {
    return this.currentValue ?? this.emptyDate();
  }

  constructor(
    public localeService: TetaConfigService,
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef
  ) {
    localeService.locale
      .pipe(takeWhile((_) => this._alive))
      .subscribe((locale: TetaLocalisation) => {
        this.locale = locale;
      });
  }

  @HostListener('window:keyup', ['$event']) keyUp(event: KeyboardEvent): void {
    if (!this.open) {
      return;
    }
    if (event.code === 'Escape') {
      this.currentValue = this.value;
      this.open = false;
    }
  }

  writeValue(value: any) {
    this.value = value;
    this._cdr.markForCheck();
  }

  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cdr.detectChanges();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._alive = false;
  }

  applyValue(date: Date) {
    this.setDate(date);
    this.value = this.currentValue;
    this.onChange(new Date(this.value));
    this.open = false;
  }

  setDate = (day: Date) => {
    if (day === null || day === undefined) {
      this.currentValue = null;
      return;
    }
    const dt = this.internalValue;
    dt.setFullYear(day.getFullYear(), day.getMonth(), day.getDate());
    this.currentValue = new Date(dt);
    this._cdr.markForCheck();
  };

  setYear = (year: number) => {
    const dt = this.internalValue;
    dt.setFullYear(year);
    this.currentValue = new Date(dt);
    this.setMode(DatePickerMode.date);
    this._cdr.markForCheck();
  };

  setMonth = (month: number) => {
    const dt = this.internalValue;
    dt.setMonth(month);
    this.currentValue = new Date(dt);
    this.setMode(DatePickerMode.date);
    this._cdr.markForCheck();
  };

  setHour = (hours: number) => {
    const dt = this.internalValue;
    dt.setHours(hours);
    this.currentValue = new Date(dt);
    this._cdr.markForCheck();
  };

  setMinute = (minute: number) => {
    const dt = this.internalValue;
    dt.setMinutes(minute);
    this.currentValue = new Date(dt);
    this._cdr.markForCheck();
  };

  setSecond = (seconds: number) => {
    const dt = this.internalValue;
    dt.setSeconds(seconds);
    this.currentValue = new Date(dt);
    this._cdr.markForCheck();
  };

  setToday = () => {
    this.currentValue = this.emptyDate();
    this._cdr.markForCheck();
  };

  clearPicker = (event: MouseEvent): void => {
    this.preventEvent(event);
    this.value = null;
    this.onChange(null);
  };

  isDateInDisabledPeriod = (dat: Date): boolean => {
    if (!this.disabledPeriods || this.disabledPeriods.length < 1 || !dat) {
      return false;
    }
    return this.disabledPeriods.some(
      (d: DatePeriod) =>
        d &&
        d.start &&
        d.end &&
        d.start.getTime() <= dat.getTime() &&
        d.end.getTime() >= dat.getTime()
    );
  };

  isScrollIgnored = (): boolean =>
    this.displayMode === DatePickerMode.month ||
    this.displayMode === DatePickerMode.year;

  scrollMonth = (e: any) => {
    const delta = e?.deltaY ?? e;

    if (e instanceof WheelEvent) {
      this.preventEvent(e);
    }

    if (this.isScrollIgnored()) {
      return false;
    }
    this.currentValue = DatePickerUtil.scrollMonth(delta, this.internalValue);
  };

  scrollYear = (e: any) => {
    this.preventEvent(e);
    if (this.isScrollIgnored()) {
      return false;
    }
    this.currentValue = DatePickerUtil.scrollMonth(
      e.deltaY,
      this.internalValue
    );
  };

  openPicker = (show: boolean) => {
    if (this.disabled) {
      return;
    }
    if (!show) {
      this.setMode(DatePickerMode.date);
      this.applyValue(this.currentValue);
    }
    this.open = show;
    this._cdr.markForCheck();
  };

  closePicker = () => {
    this.openPicker(false);
    this.onTouched();
  };

  preventEvent = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    return false;
  };

  focus() {
    this._elementRef.nativeElement.focus();
  }

  setMode(mode: DatePickerMode) {
    let result: DatePickerMode;
    if (mode === this.displayMode || mode === DatePickerMode.date) {
      result = DatePickerMode.date;
    } else {
      result = mode;
    }
    this.displayMode = result;
  }

  private emptyDate() {
    return DateUtil.truncateToDay(new Date());
  }
}
