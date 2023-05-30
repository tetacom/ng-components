import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter, forwardRef,
  Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {BasePicker} from "../base-picker";
import {DatePipe} from "@angular/common";
import {Align} from "../../../common/enum/align.enum";
import {VerticalAlign} from "../../../common/enum/vertical-align.enum";
import {viewType} from 'projects/components/src/common/model/view-type.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import dayjs from "dayjs";
import {
  maskitoDateRangeOptionsGenerator,
} from "@maskito/kit";
import {ReplaySubject} from "rxjs";
import {DateFromToModel} from "../model/from-to.model";

export const DATE_Range_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateRangeComponent),
  multi: true,
};

@Component({
  selector: 'teta-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [DATE_Range_CONTROL_VALUE_ACCESSOR, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangeComponent extends BasePicker implements OnInit, ControlValueAccessor {
  @Input() date: DateFromToModel = {from: null, to: null};
  @Input() locale: string = 'ru';
  @Input() showTime: boolean = false;
  @Input() minDate: Date | string | number = null;
  @Input() maxDate: Date | string | number = null;
  @Input() invalid: boolean = false;
  @Input() disabled: boolean = false;
  @Input() align: Align = Align.left;
  @Input() verticalAlign: VerticalAlign = VerticalAlign.auto;
  @Input() viewType: viewType = 'rounded'
  @Input() appendToBody: boolean;
  @Input() backdrop: boolean;
  @Input() allowNull: boolean =false;
  @ViewChild('input') input: ElementRef;
  @Output() selectDate: EventEmitter<DateFromToModel> = new EventEmitter<DateFromToModel>()
  public mask: string = '';
  public selectedDate: ReplaySubject<DateFromToModel> = new ReplaySubject<DateFromToModel>(1)

  constructor(override _cdr: ChangeDetectorRef, override _elementRef: ElementRef, override datePipe: DatePipe) {
    super(_elementRef, _cdr, datePipe)
  }

  override changeSelectedDate(date: Date, selectedDate: DateFromToModel) {
    if (selectedDate.from) {
      const from = new Date(Math.min(new Date(selectedDate.from).getTime(), date.getTime()));
      const to = new Date(Math.max(new Date(selectedDate.from).getTime(), date.getTime()));
      this.setDate({from, to})
      this.emitValue({from, to})
      this.selectedDate.next({from: null, to: null})
      this.open = false;
    } else {
      this.setDate({from: date, to: null})
      this.selectedDate.next({from: date, to: null})
    }

  }

  override checkNull() {
    if (this.allowNull) {
      return null
    }
    return this.datePipe.transform(new Date(), 'dd.MM.yyyy') + ' - ' + this.datePipe.transform(new Date(), 'dd.MM.yyyy')
  }

  prepareInput() {
    let str = this.getLocaleString(this.date.from) + ' - ' + this.getLocaleString(this.date.to)
    if (!this.date?.from) {
      str = this.allowNull ? '' : this.getLocaleString(new Date()) + ' - ' + this.getLocaleString(new Date())
    }
    let option: { mode, separator, min?, max?, minLength?, maxLength? } = {
      mode: 'dd/mm/yyyy',
      separator: '.',
    };
    this.mask = 'dd.mm.yyyy - dd.mm.yyyy';
    if (this.minDate) {
      option.min = dayjs(new Date(this.minDate)).startOf('day')
    }
    if (this.maxDate) {
      option.max = dayjs(new Date(this.maxDate)).endOf('day')
    }
    this.maskitoOptions = maskitoDateRangeOptionsGenerator(option)
    this.changePlaceholder(str)
  }

  onBlur() {
    if (this.allowNull && this.inputText.trim() === '') {
      this.setDate({from: null, to: null})
      this.selectedDate.next({from: null, to: null})
      this.emitValue({from: null, to: null})
    } else {

      const val = this.inputText.replace('–','-').split('-');
      const from = this.getDateFromStr(val[0].trim());
      const to = this.getDateFromStr(val[1]?.trim());
      if (to.day && to.year && to.month) {
        let fromDate = this.getAvailableDate(this.minDate, this.maxDate, new Date(from.year, from.month - 1, from.day))
        let toDate = this.getAvailableDate(this.minDate, this.maxDate, new Date(to.year, to.month - 1, to.day))
        if (fromDate.getTime() > toDate.getTime()) {
          [fromDate, toDate] = [toDate, fromDate]
        }

        this.setDate({from: fromDate, to: toDate})
        this.emitValue({from: fromDate, to: toDate})
        this.selectedDate.next({from: null, to: null})
        if (toDate && fromDate) {
          this.open = false;
        }
      } else {
        this.setDate(this.date);
        this.selectedDate.next({from: null, to: null})
      }
    }

  }

  setDate(range: DateFromToModel) {
    if (!range?.from && !range?.to && this.allowNull) {
      this.inputText = ''
      this.changePlaceholder('')
      this.selectedDate.next({
        from: range?.from || null,
        to: range?.to || null
      })

    } else {
      this.inputText = this.getLocaleString(range.from) + ' - ' + this.getLocaleString(range.to)
      this.changePlaceholder(this.getLocaleString(range.from) + ' - ' + this.getLocaleString(range.to))
    }
  }

  writeValue(obj: DateFromToModel): void {
    if (obj?.from) {
      this.date = {
        from: new Date(obj.from),
        to: new Date(obj.to)
      }
      this.setDate({
        from: new Date(obj.from),
        to: new Date(obj.to)
      })
    } else {
      this.date = {from: null, to: null}
    }
    this.selectedDate.next({
      from: null,
      to: null
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
  }

  ngOnInit(): void {
    if (this.date?.from) {
      this.setDate({
        from: this.allowNull ? null : new Date(this.date?.from),
        to: this.allowNull ? null : new Date(this.date?.to)
      })
    } else {
      this.setDate({
        from: this.allowNull ? null : new Date(),
        to: this.allowNull ? null : new Date()
      })
    }

    this.selectedDate.next({
      from: null,
      to: null
    })

    this.prepareInput()
  }

  onChange(date: Date) {
  }
}
