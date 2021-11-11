import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PickerLocaleModel } from '../model/picker-locale-model';
import { fromEvent, merge } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { PickerTouchService } from '../service/picker-touch.service';

@Component({
  selector: 'teta-month-select',
  templateUrl: './month-select.component.html',
  styleUrls: ['./month-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthSelectComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() locale: PickerLocaleModel;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() size = 8;
  @Output() monthSelected = new EventEmitter<number>();
  @Output() monthApplied = new EventEmitter<number>();

  _currentMonth: number;

  @Input()
  set currentMonth(val: number) {
    this._currentMonth = val;
    this.makeMonths();
  }

  get currentMonth(): number {
    return this._currentMonth;
  }

  _currentYear: number;

  @Input()
  set currentYear(val: number) {
    this._currentYear = val;
  }

  get currentYear(): number {
    return this._currentYear;
  }

  today: Date;
  months: number[] = [];
  shift = 0;

  private _alive = true;

  private get _displayDate(): Date {
    let month = 0;
    let year = 0;
    if (
      this.currentMonth !== null &&
      this.currentMonth !== undefined &&
      this.currentMonth >= 0 &&
      this.currentMonth <= 11
    ) {
      month = this.currentMonth;
    }
    if (this.currentYear !== null && this.currentYear !== undefined) {
      year = this.currentYear;
    }
    return new Date(year, month, 1);
  }

  constructor(
    private _elementRef: ElementRef,
    private _cdr: ChangeDetectorRef,
    private _pickerTouchService: PickerTouchService
  ) {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this._alive = false;
  }

  ngAfterViewInit() {
    const touchMove$ = fromEvent(
      this._elementRef.nativeElement.parentElement,
      'touchmove'
    );

    touchMove$
      .pipe(
        takeWhile((_) => this._alive),
        tap((e: TouchEvent) => {
          if (e.type === 'touchmove') {
            this._pickerTouchService.onTouchMove(e);
          }
        })
      )
      .subscribe();

    this._pickerTouchService.step
      .pipe(
        takeWhile((_) => this._alive),
        tap((_) => {
          this.shiftMonthSelector(_);
          this._cdr.detectChanges();
        })
      )
      .subscribe();
  }

  scrollMonthSelector = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const step = e.deltaY > 0 ? 1 : -1;
    this.shiftMonthSelector(step);
  };

  shiftMonthSelector = (step: number = 0) => {
    this.shift += step;
    this.makeMonths();
  };

  setMonth = (e: any, month: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isMonthDisabled(month)) {
      this.shift = 0;
      this.monthSelected.emit(month);
    }
  };

  applyMonth = (e: any, month: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isMonthDisabled(month)) {
      this.monthApplied.emit(month);
    }
  };

  isMonthDisabled = (month: number) => {
    if (!month && !this.currentYear) {
      const dat = new Date(this.currentYear, month, 1);
      return this.isMaxInvalid(dat) || this.isMinInvalid(dat);
    }
    return false;
  };

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

  private makeMonths() {
    const start = this._displayDate;
    this.months = [];
    start.setMonth(start.getMonth() - 3);
    for (let i = this.shift; i < this.size + this.shift; i++) {
      const dt = new Date(start.getFullYear(), start.getMonth() + i, 1);
      this.months.push(dt.getMonth());
    }
  }
}
