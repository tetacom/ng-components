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
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { PickerTouchService } from '../service/picker-touch.service';

@Component({
  selector: 'teta-year-select',
  templateUrl: './year-select.component.html',
  styleUrls: ['./year-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearSelectComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() currentYear: number;
  @Input() today: Date;
  @Input() size = 8;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() allowableRange: number[] = [1900, 2100];
  @Output() yearSelected = new EventEmitter<number>();
  @Output() yearApplied = new EventEmitter<number>();

  minYearDate: Date;
  maxYearDate: Date;
  years: number[];
  minYearList: number[];
  maxYearList: number[];
  decreaseInterval: number;
  increaseInterval: number;
  private _alive = true;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _pickerTouchService: PickerTouchService,
    private _elementRef: ElementRef
  ) {}

  ngOnInit() {
    const [minRange, maxRange] = this.allowableRange;
    this.minYearDate = new Date(minRange, 0, 1);
    this.maxYearDate = new Date(maxRange, 11, 31);
    this.initMinYearList();
    this.initMaxYearList();
    this.initYearSelector(this.currentYear);
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
          this._pickerTouchService.onTouchMove(e);
        })
      )
      .subscribe();

    this._pickerTouchService.step
      .pipe(
        takeWhile((_) => this._alive),
        tap((_) => {
          this.shiftYearSelector(_);
          this._cdr.detectChanges();
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    window.clearInterval(this.decreaseInterval);
    window.clearInterval(this.increaseInterval);
    this._alive = false;
  }

  scrollYearSelector = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const step = e.deltaY > 0 ? 1 : -1;
    this.shiftYearSelector(step);
  };

  setYear = (e: any, year: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isYearDisabled(year)) {
      this.yearSelected.emit(year);
    }
  };

  applyYear = (e: any, year: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isYearDisabled(year)) {
      this.yearApplied.emit(year);
    }
  };

  initYearSelector = (year: number) => {
    if (!year) {
      year = this.today.getFullYear();
    }
    this.years = [year];
    let direction = false;
    for (let i = 1; i < this.size; i++) {
      if (direction) {
        this.years.unshift(this.years[0] - 1);
      } else {
        this.years.push(this.years[this.years.length - 1] + 1);
      }
      direction = !direction;
    }
    this.checkRanges();
  };

  initMinYearList = () => {
    this.minYearList = [this.minYearDate.getFullYear()];
    for (let i = 1; i < this.size; i++) {
      this.minYearList.push(this.minYearList[this.minYearList.length - 1] + 1);
    }
  };

  initMaxYearList = () => {
    this.maxYearList = [this.maxYearDate.getFullYear()];
    for (let i = 1; i < this.size; i++) {
      this.maxYearList.unshift(this.maxYearList[0] - 1);
    }
  };

  checkRanges = () => {
    if (
      this.years.some((year) => {
        const dat = new Date(year, 0, 1);
        return this.isMinYear(dat);
      })
    ) {
      this.years = this.minYearList;
    }
    if (
      this.years.some((year) => {
        const dat = new Date(year, 0, 1);
        return this.isMaxYear(dat);
      })
    ) {
      this.years = this.maxYearList;
    }
  };

  shiftYearSelector = (step: number = 0) => {
    this.years = this.years.map((year) => year + step);
    this.checkRanges();
  };

  decreaseYearSelector = (step: number = 3) => {
    const dat = new Date(this.years[0] - step, 0, 1);
    if (this.isMinYear(dat)) {
      this.years = this.minYearList;
      return;
    }

    this.years = this.years.map((year) => year - step);
  };

  increaseYearSelector = (step: number = 3) => {
    const dat = new Date(this.years[this.years.length - 1] + step, 0, 1);
    if (this.isMaxYear(dat)) {
      this.years = this.maxYearList;
      return;
    }
    this.years = this.years.map((year) => year + step);
  };

  // stopLongDecrease = () => {
  //   window.clearInterval(this.decreaseInterval);
  // };
  //
  // stopLongIncrease = () => {
  //   window.clearInterval(this.increaseInterval);
  // };

  isMinYear = (dat: Date): boolean => {
    if (!this.minYearDate || !(this.minYearDate instanceof Date) || !dat) {
      return false;
    }
    return this.minYearDate.getFullYear() > dat.getFullYear();
  };

  isMaxYear = (dat: Date): boolean => {
    if (!this.maxYearDate || !(this.maxYearDate instanceof Date) || !dat) {
      return false;
    }
    return this.maxYearDate.getFullYear() < dat.getFullYear();
  };

  isYearDisabled = (year: number) => {
    if (year) {
      const dat = new Date(year, 0, 1);
      return this.isMaxInvalid(dat) || this.isMinInvalid(dat);
    }
    return false;
  };

  isMinInvalid = (dat: Date): boolean => {
    if (!this.minDate || !(this.minDate instanceof Date) || !dat) {
      return false;
    }
    return this.minDate.getFullYear() > dat.getFullYear();
  };

  isMaxInvalid = (dat: Date): boolean => {
    if (!this.maxDate || !(this.maxDate instanceof Date) || !dat) {
      return false;
    }
    return this.maxDate.getFullYear() < dat.getFullYear();
  };
}
