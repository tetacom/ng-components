import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PickerLocaleModel } from '../model/picker-locale-model';
import { PickerLocaleService } from '../service/picker-locale.service';
import { takeWhile } from 'rxjs/operators';
import { DatePickerMode } from '../model/date-picker-mode.enum';

export const MONTH_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MonthPickerComponent),
  multi: true,
};

@Component({
  selector: 'teta-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
  providers: [MONTH_PICKER_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthPickerComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input() disabled: boolean;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() showToday = true;
  @Input() appendToBody = true;

  @HostBinding('class.datepicker_open') showPicker: boolean;
  @HostBinding('class.datepicker') private readonly classDatepicker = true;
  @HostBinding('tabindex') private readonly tabindex = 0;

  datePickerModeEnum = DatePickerMode;

  locale: PickerLocaleModel;
  today: Date;

  displayMode: DatePickerMode = DatePickerMode.month;

  _value: Date | null = null;
  _currentMonth: number | null;
  _currentYear: number | null;

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  get currentMonth(): number | null {
    return this._currentMonth;
  }

  set currentMonth(v: number | null) {
    if (v === null || v === undefined || v < 0 || v > 11) {
      return;
    }
    if (v !== this._currentMonth) {
      this._currentMonth = v;
    }
  }

  get currentYear(): number | null {
    return this._currentYear;
  }

  set currentYear(v: number | null) {
    if (v !== this._currentYear) {
      this._currentYear = v;
    }
  }

  private _alive = true;

  constructor(
    public localeService: PickerLocaleService,
    private _cdr: ChangeDetectorRef
  ) {
    localeService.locale
      .pipe(takeWhile((_) => this._alive))
      .subscribe((locale: PickerLocaleModel) => {
        this.locale = locale;
      });
    this.setDefaults();
  }

  writeValue(value: any) {
    this._value = value;
    this.initPicker(value);
  }

  initPicker(date: Date) {
    if (!date || !(date instanceof Date)) {
      this.setDefaults();
    } else {
      this.currentMonth = date.getMonth();
      this.currentYear = date.getFullYear();
    }
    this._cdr.markForCheck();
  }

  setDefaults() {
    this.today = new Date();
    this.currentMonth = null;
    this.currentYear = null;
  }

  clearPicker() {
    this.value = null;
  }

  onChange = (_: any) => {};

  onTouched = () => {};

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnInit() {
    if (!this.minDate || !(this.minDate instanceof Date)) {
      this.minDate = new Date('1900-01-01T00:00:00Z');
    }
    if (!this.maxDate || !(this.maxDate instanceof Date)) {
      this.maxDate = new Date('2100-12-31T00:00:00Z');
    }
    this.initPicker(this.value);
  }

  ngOnDestroy() {
    this._alive = false;
  }

  isMinInvalid = (dat: Date): boolean => {
    if (!this.minDate || !(this.minDate instanceof Date) || !dat) {
      return false;
    }
    const min = new Date(
      this.minDate.getFullYear(),
      this.minDate.getMonth(),
      1
    );
    return min.getTime() > dat.getTime();
  };

  isMaxInvalid = (dat: Date): boolean => {
    if (!this.maxDate || !(this.maxDate instanceof Date) || !dat) {
      return false;
    }
    const max = new Date(
      this.maxDate.getFullYear(),
      this.maxDate.getMonth(),
      1
    );
    return max.getTime() < dat.getTime();
  };

  scrollMonth = (e: any) => {
    if (this.showPicker) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (!this._value) {
      return;
    }
    if (this.currentYear === null || this.currentYear === undefined) {
      this.currentYear = this.today.getFullYear();
    }
    if (this.currentMonth === null || this.currentMonth === undefined) {
      this.currentMonth = this.today.getMonth();
    }
    if (e.deltaY > 0) {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    } else {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    }
    const newDate = new Date(this.currentYear, this.currentMonth, 1, 0, 0, 0);
    if (!this.isMinInvalid(newDate) && !this.isMaxInvalid(newDate)) {
      this.value = newDate;
    }
  };

  scrollYear = (e: any) => {
    if (this.showPicker) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (!this._value) {
      return;
    }
    if (!this.currentYear) {
      this.currentYear = this.today.getFullYear();
    }
    if (!this.currentMonth) {
      this.currentMonth = this.today.getMonth();
    }
    if (e.deltaY > 0) {
      this.currentYear++;
    } else {
      this.currentYear--;
    }
    const newDate = new Date(this.currentYear, this.currentMonth, 1, 0, 0, 0);
    if (!this.isMinInvalid(newDate) && !this.isMaxInvalid(newDate)) {
      this.value = newDate;
    }
  };

  setMonth = (month: number) => {
    this.currentMonth = month;
    if (!this.currentYear) {
      this.currentYear = this.today.getFullYear();
    }
    const newDate = new Date(this.currentYear, this.currentMonth, 1, 0, 0, 0);
    if (!this.isMinInvalid(newDate) && !this.isMaxInvalid(newDate)) {
      this.value = newDate;
    }
  };

  setYear = (year: number) => {
    this.currentYear = year;
    if (!this.currentMonth) {
      this.currentMonth = this.today.getMonth();
    }
    const newDate = new Date(this.currentYear, this.currentMonth, 1, 0, 0, 0);
    if (!this.isMinInvalid(newDate) && !this.isMaxInvalid(newDate)) {
      this.value = newDate;
    }
  };

  setToday = () => {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.value = new Date(this.currentYear, this.currentMonth, 1, 0, 0, 0);
    this.showPicker = false;
  };

  setMode(mode: DatePickerMode) {
    let result: DatePickerMode;
    if (mode === this.displayMode || mode === DatePickerMode.month) {
      result = DatePickerMode.month;
    } else {
      result = mode;
    }
    this.displayMode = result;
  }
}
