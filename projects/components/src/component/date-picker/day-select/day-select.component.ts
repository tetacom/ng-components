import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {DayModel} from '../model/day-model';
import {DatePeriod} from '../model/date-period';
import {takeWhile, tap, withLatestFrom} from 'rxjs/operators';
import {DatePickerUtil} from '../util/date-picker-util';
import {fromEvent, Subject} from 'rxjs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DateUtil} from '../../../util/date-util';
import {TetaLocalisation} from '../../../locale/teta-localisation';
import {TetaConfigService} from '../../../locale/teta-config.service';

export const DAY_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DaySelectComponent),
  multi: true,
};

@Component({
  selector: 'teta-day-select',
  templateUrl: './day-select.component.html',
  styleUrls: ['./day-select.component.scss'],
  providers: [DAY_SELECT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaySelectComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() firstDayOfWeek = 1;
  @Input() disabledDates: Date[];
  @Input() disabledPeriods: DatePeriod[];
  @Input() disabledDays: number[];

  @Input() set minDate(d: Date) {
    this._minDate = d;

    if(this._currentValue) {
      this.createDays();
    }

    this._cdr.markForCheck();
  };

  @Input() set maxDate(d: Date) {
    this._maxDate = d;

    if(this._currentValue) {
      this.createDays();
    }

    this._cdr.markForCheck();
  };
  @Input() disabled: boolean;

  @Output() dateSelected = new EventEmitter<Date>();
  @Output() monthSelected = new EventEmitter<number>();
  @Output() yearSelected = new EventEmitter<number>();

  locale: TetaLocalisation;

  value: Date;

  _currentValue: Date;
  private _minDate: Date;
  private _maxDate: Date;


  set currentValue(val: Date) {
    if (
      !this._currentValue ||
      DateUtil.truncateToDay(val)?.getTime() !==
      DateUtil.truncateToDay(this._currentValue)?.getTime()
    ) {
      this._currentValue = val;
      this.createDays();
      this.checkDays();
    } else {
      this._currentValue = val;
    }
    this._cdr.markForCheck();
  }

  get currentValue(): Date {
    return this._currentValue;
  }

  days: Array<DayModel>;
  weekDays: number[] = [];

  private _alive = true;

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

  ngOnInit() {
    this.weekDays = this.createWeekDays();

    const touchStart$ = fromEvent(this._elementRef.nativeElement, 'touchstart');
    const touchEnd$ = fromEvent(this._elementRef.nativeElement, 'touchend');

    touchEnd$
      .pipe(
        takeWhile((_) => this._alive),
        withLatestFrom(touchStart$),
        tap((touches: [TouchEvent, TouchEvent]) => {
          const [start, end] = touches.map((_) => _.changedTouches?.item(0));
          const deltaY = end?.clientY - start?.clientY;
          if (deltaY !== 0) {
            this.scrollMonth(deltaY);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this._alive = false;
  }

  writeValue(model: Date) {
    this.value = model;
    this.currentValue = model ? model : new Date();
    this._cdr.markForCheck();
  }

  onChange(_: any) {
  }

  onTouched() {
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cdr.markForCheck();
  }

  applyValue(day: DayModel, event: MouseEvent) {
    this.preventEvent(event);
    if (day === null || day === undefined || day.disabled) {
      return;
    }
    this.value = day.date;
    this.currentValue = day.date;
    this.onChange(day.date);
  }

  setDate(day: DayModel, event: MouseEvent) {
    if (day === null || day === undefined || day.disabled) {
      return;
    }
    if (
      day.date !== null &&
      day.date !== undefined &&
      day.date instanceof Date
    ) {
      this.currentValue = day.date;
      this.dateSelected.emit(day.date);
    }
  }

  scrollMonth(event: WheelEvent | number) {
    const deltaY = event instanceof WheelEvent ? event.deltaY : event;

    if (event instanceof WheelEvent) {
      this.preventEvent(event);
    }
    this.currentValue = DatePickerUtil.scrollMonth(deltaY, this.currentValue);
    this.monthSelected.emit(this.currentValue.getMonth());
    this.yearSelected.emit(this.currentValue.getFullYear());
    this._cdr.detectChanges();
  }

  private createWeekDays(): number[] {
    const result = [];
    let dayIndex = this.firstDayOfWeek;
    for (let i = 0; i < 7; i++) {
      result.push(dayIndex);
      dayIndex = dayIndex === 6 ? 0 : ++dayIndex;
    }
    return result;
  }

  private createDays() {
    this.days = DatePickerUtil.getPickerDays(
      this.currentValue,
      this.firstDayOfWeek,
      this._minDate,
      this._maxDate,
      this.disabledDates,
      this.disabledDays,
      this.disabledPeriods
    );
  }

  private checkDays() {
    if (this.days) {
      this.days = this.days.map((dat: DayModel) => ({
        ...dat,
        selected:
          dat.date.getFullYear() === this.currentValue.getFullYear() &&
          dat.date.getMonth() === this.currentValue.getMonth() &&
          dat.date.getDate() === this.currentValue.getDate(),
      }));
    }
  }

  private preventEvent(event: any) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }
}
