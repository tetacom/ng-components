import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, forwardRef,
  Input, OnDestroy,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {viewType} from "../../../common/model/view-type.model";
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Align} from "../../../common/enum/align.enum";
import {VerticalAlign} from "../../../common/enum/vertical-align.enum";
import {MaskitoOptions} from "@maskito/core";
import {maskitoDateOptionsGenerator, maskitoDateTimeOptionsGenerator} from '@maskito/kit';
import {DatePipe} from "@angular/common";
import dayjs from "dayjs";

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
  providers: [DATE_PICKER_CONTROL_VALUE_ACCESSOR, DatePipe]

})

export class DatePickerComponent implements OnInit, ControlValueAccessor {
  @Input() date: Date | string | number;
  @Input() locale: string = 'ru';
  @Input() showTime: boolean = false;
  @Input() min: Date | string | number = null;
  @Input() max: Date | string | number = null;
  @Input() invalid: boolean = false;
  @Input() disabled: boolean = false;
  @Input() align: Align = Align.left;
  @Input() verticalAlign: VerticalAlign = VerticalAlign.auto;
  @Input() viewType: viewType = 'rounded'
  @Input() appendToBody: boolean;
  @Input() backdrop: boolean;
  @Input() allowNull: boolean = false;
  @ViewChild('input') input: ElementRef;
  @Output() selectDate: EventEmitter<Date> = new EventEmitter<Date>()
  public open = false;
  public selectedDate: ReplaySubject<Date | string | number> = new ReplaySubject<Date | string | number>(1)
  public placeholder = ''
  public mask: string = '';
  public inputText = this.checkNull();
  public maskitoOptions: MaskitoOptions;

  constructor(private _elementRef: ElementRef, private _cdr: ChangeDetectorRef, private _fb: FormBuilder, private datePipe: DatePipe) {
  }
   changeInput(v){
     this.changePlaceholder(v)
   }
  changePlaceholder(value: string) {
    let val = this.mask.split('');
    for (let i = 0; value.length > i; i++) {
      val.splice(i, 1, value[i]);
    }
    this.placeholder = val.join('');
    this._cdr.detectChanges()
  }

  checkNull() {
    if (this.date && this.allowNull) {
      return null
    }
    return this.datePipe.transform(new Date(), 'dd.MM.yyyy, HH:mm')
  }

  openPicker = (show: boolean) => {
    if (this.disabled) {
      return;
    }
    this.open = show;
    this._cdr.markForCheck();
  };

  changeSelectedDate(date: Date) {
    this.setDate(date)
    this.emitValue(date)
    this.open = false;
  }

  emitValue(value: Date) {
    this.date = value
    this.selectDate.emit(value)
    this.onChange(value)
  }

  setDate(date: string | Date | number) {
    if (!date && this.allowNull) {
      this.inputText=''
      this.changePlaceholder('')
      this.selectedDate.next(new Date(this.min || new Date()))
    } else {
      this.inputText=this.getLocaleString(date)
      this.changePlaceholder(this.getLocaleString(date))
      this.selectedDate.next(date)
    }
  }

  onBlur() {
    if (this.allowNull && this.inputText.trim() === '') {
      this.setDate(null)
      this.emitValue(null)
    } else {
      const val = this.inputText.split(',');
      const {day, year, month} = this.getDateFromStr(val[0]);
      const {mins, hours} = this.getTimeFromStr(val[1]);
      if (day && year && month) {
        let date = new Date(year, month - 1, day)
        if (this.showTime) {
          date = new Date(date.setHours(hours || 0, mins || 0))
        }
        this.changeSelectedDate(this.getAvailableDate(this.min, this.max, date))
      } else {
        this.setDate(this.date);
      }
    }

  }

  checkEnter(e) {
    if (e.key === "Enter") {
      this.inputText=e.target.value;
      this.onBlur()
    }
    this.open = true;
  }

  isAvailableLength(val: string, length: number) {
    if (val?.length) {
      return val.length === length
    }
    return false
  }

  getDateFromStr(str: string, separator: string = '.') {
    const date = str?.split(separator)
    const day = this.isAvailableLength((date?.[0]), 2) ? Number(date[0]) : null
    const month = this.isAvailableLength((date?.[1]), 2) ? Number(date[1]) : null
    const year = this.isAvailableLength((date?.[2]), 4) ? Number(date[2]) : null
    return {day, month, year}
  }

  getTimeFromStr(str: string, separator: string = ':') {
    const time = str?.trim().split(separator)
    const hours = this.isAvailableLength((time?.[0]), 2) ? Number(time[0]) : null
    const mins = this.isAvailableLength((time?.[1]), 2) ? Number(time[1]) : null
    return {hours, mins}
  }

  prepareInput() {
    const str = this.getLocaleString(this.date)
    let option;
    const setMinMax = () => {
      if (this.min) {
        option.min = dayjs(new Date(this.min)).startOf('day')
      }
      if (this.max) {
        option.max = dayjs(new Date(this.max)).endOf('day')
      }
    }
    if (this.showTime) {
      this.mask = 'dd.mm.yyyy, hh:mm';
      option = {
        dateMode: 'dd/mm/yyyy',
        timeMode: 'HH:MM',
        dateSeparator: '.',
      }
      setMinMax()
      this.maskitoOptions = maskitoDateTimeOptionsGenerator(option)
    } else {
      this.mask = 'dd.mm.yyyy';
      option = {
        mode: 'dd/mm/yyyy',
        separator: '.',
      }
      setMinMax()
      this.maskitoOptions = maskitoDateOptionsGenerator(option)
    }
    this.changePlaceholder(str)
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
    })
  }

  getAvailableDate(min: Date | number | string, max: Date | number | string, date: Date | number | string) {
    let minDate = dayjs(new Date(min)).startOf("day").toDate()
    let maxDate = dayjs(new Date(max)).endOf("day").toDate()
    if (min && minDate.getTime() >= new Date(date).getTime()) {
      return minDate
    }
    if (max && maxDate.getTime() <= new Date(date).getTime()) {
      return maxDate
    }
    return new Date(date)
  }


  ngOnInit(): void {
    this.setDate(new Date(this.date))
    this.prepareInput()
  }

  onChange(date: Date) {
  }

  registerOnChange(fn: (date: Date) => any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: Date | string | number): void {
    if (obj) {
      this.date = new Date(obj)
      this.setDate(new Date(this.date))
    } else {
      this.date = null
    }
    this.selectedDate.next(new Date(this.min || new Date()))
  }


}
