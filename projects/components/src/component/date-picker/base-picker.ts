import dayjs from 'dayjs';
import { ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { Align } from '../../common/enum/align.enum';
import { VerticalAlign } from '../../common/enum/vertical-align.enum';
import { ReplaySubject } from 'rxjs';
import { MaskitoOptions } from '@maskito/core';
import { viewType } from '../../common/model/view-type.model';
import { DatePipe } from '@angular/common';
import { DateFromToModel } from './model/from-to.model';

export abstract class BasePicker {
  abstract mask: string;
  abstract date;
  abstract locale: string;
  abstract showTime: boolean;
  abstract minDate: Date | string | number;
  abstract maxDate: Date | string | number;
  abstract invalid: boolean;
  abstract disabled: boolean;
  abstract align: Align;
  abstract verticalAlign: VerticalAlign;
  abstract viewType: viewType;
  abstract appendToBody: boolean;
  abstract backdrop: boolean;
  abstract allowNull: boolean;
  abstract input: ElementRef;
  abstract selectDate: EventEmitter<Date | DateFromToModel>;
  public open = false;
  abstract selectedDate: ReplaySubject<any>;
  public placeholder = '';
  public inputText: string;
  public maskitoOptions: MaskitoOptions;

  protected constructor(
    protected _elementRef: ElementRef,
    protected _cdr: ChangeDetectorRef,
    protected datePipe: DatePipe
  ) {
    this.inputText = this.checkNull();
  }

  abstract onChange(date: Date);

  abstract prepareInput();

  abstract onBlur();

  abstract setDate(date);

  changeInput(v) {
    this.changePlaceholder(v);
  }

  changePlaceholder(value: string) {
    let val = this.mask.split('');
    for (let i = 0; value.length > i; i++) {
      val.splice(i, 1, value[i]);
    }

    this.placeholder = val.join('');
  }

  openChange(e: boolean) {
    if (!e) {
      this.onBlur();
    }
    this.open = e;
  }

  checkNull() {
    if (!this.date && this.allowNull) {
      return null;
    }
    return this.datePipe.transform(new Date(), 'dd.MM.yyyy, HH:mm');
  }

  openPicker = (show: boolean) => {
    if (this.disabled) {
      return;
    }
    this.open = show;
    this._cdr.markForCheck();
  };

  changeSelectedDate(date, selectedDate?) {
    this.setDate(date);
    this.emitValue(date);
    this.open = false;
  }

  emitValue(value) {
    if (this.isValueChange(value)) {
      this.date = value;
      this.selectDate.emit(value);
      this.onChange(value);
    }
  }

  isValueChange(value) {
    return new Date(value).getTime() !== new Date(this.date).getTime();
  }

  checkEnter(e) {
    if (e.key === 'Enter') {
      this.inputText = e.target.value;
      this.onBlur();
    }
    if (e.key === '-') {
      e.preventDefault();
    }
    this.open = true;
  }

  isAvailableLength(val: string, length: number) {
    if (val?.length) {
      return val.length === length;
    }
    return false;
  }

  getDateFromStr(str: string, separator: string = '.') {
    const date = str?.split(separator);
    const day = this.isAvailableLength(date?.[0], 2) ? Number(date[0]) : null;
    const month = this.isAvailableLength(date?.[1], 2) ? Number(date[1]) : null;
    const year = this.isAvailableLength(date?.[2], 4) ? Number(date[2]) : null;
    return { day, month, year };
  }

  getTimeFromStr(str: string, separator: string = ':') {
    const time = str?.trim().split(separator);
    const hours = this.isAvailableLength(time?.[0], 2) ? Number(time[0]) : null;
    const mins = this.isAvailableLength(time?.[1], 2) ? Number(time[1]) : null;
    return { hours, mins };
  }

  focus() {
    this._elementRef.nativeElement.focus();
  }

  getLocaleString(date: Date | number | string) {
    return new Date(date).toLocaleString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: this.showTime ? '2-digit' : undefined,
      minute: this.showTime ? '2-digit' : undefined,
    });
  }

  getAvailableDate(
    min: Date | number | string,
    max: Date | number | string,
    date: Date | number | string
  ) {
    let minDate = dayjs(new Date(min)).startOf('day').toDate();
    let maxDate = dayjs(new Date(max)).endOf('day').toDate();
    if (min && minDate.getTime() >= new Date(date).getTime()) {
      return new Date();
    }
    if (max && maxDate.getTime() <= new Date(date).getTime()) {
      return maxDate;
    }
    return new Date(date);
  }
}
