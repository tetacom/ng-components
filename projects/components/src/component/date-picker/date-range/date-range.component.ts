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
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { maskitoDateRangeOptionsGenerator } from '@maskito/kit';
import dayjs from 'dayjs';
import { lastValueFrom, Observable, ReplaySubject, take } from 'rxjs';

import { Align } from '../../../common/enum/align.enum';
import { VerticalAlign } from '../../../common/enum/vertical-align.enum';
import { viewType } from '../../../common/model/view-type.model';
import { BasePicker } from '../base-picker';
import { DateFromToModel } from '../model/from-to.model';
import { TetaConfigService } from '../../../locale/teta-config.service';
import { TetaLocalisation } from '../../../locale/teta-localisation';
import { ruLocale } from '../../../locale/ru';
import { RangeCalendarComponent } from './range-calendar/range-calendar.component';
import { DropdownContentDirective } from '../../dropdown/dropdown-content.directive';
import { IconComponent } from '../../icon/icon/icon.component';
import { MaskitoModule } from '@maskito/angular';
import { InputComponent } from '../../input/input/input.component';
import { DropdownHeadDirective } from '../../dropdown/dropdown-head.directive';
import { DropdownComponent } from '../../dropdown/dropdown/dropdown.component';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DropdownComponent,
        DropdownHeadDirective,
        NgClass,
        InputComponent,
        FormsModule,
        MaskitoModule,
        IconComponent,
        DropdownContentDirective,
        RangeCalendarComponent,
        AsyncPipe,
    ]
})
export class DateRangeComponent extends BasePicker implements OnInit, ControlValueAccessor {
  @Input() date: DateFromToModel = { from: null, to: null };
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
  @Input() backdrop: boolean;
  @Input() allowNull = true;
  @ViewChild('input') input: ElementRef;
  @Output() selectDate: EventEmitter<DateFromToModel> = new EventEmitter<DateFromToModel>();
  public mask = '';
  public selectedDate: ReplaySubject<DateFromToModel> = new ReplaySubject<DateFromToModel>(1);
  @HostBinding('class.daterange') private readonly classDaterange = true;
  constructor(
    override _cdr: ChangeDetectorRef,
    override _elementRef: ElementRef,
    override datePipe: DatePipe,
    private localeService: TetaConfigService,
  ) {
    super(_elementRef, _cdr, datePipe);
    this.locale = this.localeService.locale;
  }

  override changeSelectedDate(date: Date, selectedDate: DateFromToModel) {
    if (selectedDate.from) {
      const from = new Date(Math.min(new Date(selectedDate.from).getTime(), date.getTime()));
      const to = new Date(Math.max(new Date(selectedDate.from).getTime(), date.getTime()));
      this.setDate({ from, to });
      this.selectedDate.next({ from: null, to: null });
      this.open = false;
      this._cdr.detectChanges();
    } else {
      this.setDate({ from: date, to: null });
      this.selectedDate.next({ from: date, to: null });
    }
  }

  override checkNull() {
    if (this.allowNull) {
      return null;
    }
    return (
      this.datePipe.transform(new Date(), 'dd.MM.yyyy') + ' - ' + this.datePipe.transform(new Date(), 'dd.MM.yyyy')
    );
  }

  async prepareInput() {
    const config = await lastValueFrom(this.localeService.locale.pipe(take(1)));
    let str = this.getLocaleString(this.date.from) + ' - ' + this.getLocaleString(this.date.to);
    if (!this.date?.from) {
      str = this.allowNull ? '' : this.getLocaleString(new Date()) + ' - ' + this.getLocaleString(new Date());
    }
    const option: { mode; separator; min?; max?; minLength?; maxLength? } = {
      mode: 'dd/mm/yyyy',
      separator: '.',
    };
    this.mask = config.dateRangeMask;
    if (this.minDate) {
      option.min = dayjs(new Date(this.minDate)).startOf('day');
    }
    if (this.maxDate) {
      option.max = dayjs(new Date(this.maxDate)).endOf('day');
    }
    this.maskitoOptions = maskitoDateRangeOptionsGenerator(option);
    this.changePlaceholder(str);
  }

  onBlur() {
    if (this.allowNull && this.inputText.trim() === '') {
      this.setDate({ from: null, to: null });
      this.selectedDate.next({ from: null, to: null });
      this.emitValue({ from: null, to: null });
    } else {
      const val = this.inputText.replace('–', '-').split('-');
      const from = this.getDateFromStr(val[0].trim());
      const to = this.getDateFromStr(val[1]?.trim());
      if (to.day && to.year && to.month) {
        let fromDate = this.getAvailableDate(this.minDate, this.maxDate, new Date(from.year, from.month - 1, from.day));
        let toDate = this.getAvailableDate(this.minDate, this.maxDate, new Date(to.year, to.month - 1, to.day));
        if (fromDate.getTime() > toDate.getTime()) {
          [fromDate, toDate] = [toDate, fromDate];
        }

        this.setDate({ from: fromDate, to: toDate });
        this.emitValue({ from: fromDate, to: toDate });
        this.selectedDate.next({ from: null, to: null });
        if (toDate && fromDate) {
          this.open = false;
        }
      } else {
        this.setDate(this.date);
        this.selectedDate.next({ from: null, to: null });
      }
    }
  }

  setDate(range: DateFromToModel) {
    if (!range?.from && !range?.to && this.allowNull) {
      this.inputText = '';

      this.changePlaceholder('');
      this.selectedDate.next({
        from: range?.from || null,
        to: range?.to || null,
      });
    } else {
      const from = this.getLocaleString(range.from);
      const to = range.from && !range.to ? '' : this.getLocaleString(range.to);
      this.inputText = from + ' - ' + to;
      this.changePlaceholder(from + ' - ' + to);
    }
  }

  writeValue(obj: DateFromToModel): void {
    if (obj?.from) {
      this.date = {
        from: new Date(obj.from),
        to: new Date(obj.to),
      };
      this.setDate({
        from: new Date(obj.from),
        to: new Date(obj.to),
      });
    } else {
      this.date = { from: null, to: null };
    }
    this.selectedDate.next({
      from: null,
      to: null,
    });
  }

  override isValueChange(value) {
    return !(
      new Date(value.from).getTime() === new Date(this.date.from).getTime() &&
      new Date(value.to).getTime() === new Date(this.date.to).getTime()
    );
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  ngOnInit(): void {
    if (this.date?.from) {
      this.setDate({
        from: this.allowNull ? null : new Date(this.date?.from),
        to: this.allowNull ? null : new Date(this.date?.to),
      });
    } else {
      this.setDate({
        from: this.allowNull ? null : new Date(),
        to: this.allowNull ? null : new Date(),
      });
    }

    this.selectedDate.next({
      from: null,
      to: null,
    });

    this.prepareInput();
  }

  onChange(date) {}
}
