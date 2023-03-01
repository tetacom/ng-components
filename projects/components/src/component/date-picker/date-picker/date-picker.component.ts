import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {viewType} from "../../../common/model/view-type.model";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Align} from "../../../common/enum/align.enum";
import {VerticalAlign} from "../../../common/enum/vertical-align.enum";
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
  providers: [DATE_PICKER_CONTROL_VALUE_ACCESSOR]

})

export class DatePickerComponent implements OnInit, ControlValueAccessor {
  public open = false;
  @Input() date: Date | string | number = new Date();
  @Input() locale: string = 'ru';
  @Input() showTime:boolean;
  @Input() min: Date | string | number = null;
  @Input() max: Date | string | number = null;
  @Input() invalid: boolean = false;
  @Input() disabled: boolean = false;
  @Input() align: Align = Align.left;
  @Input() verticalAlign: VerticalAlign = VerticalAlign.auto;
  @Input() viewType: viewType = 'rounded'
  @Input() appendToBody: boolean;
  @Input() backdrop: boolean;
  @Output() selectDate: EventEmitter<Date> = new EventEmitter<Date>()

  public selectedDate: ReplaySubject<Date | string | number> = new ReplaySubject<Date | string | number>(1)

  constructor(private _elementRef: ElementRef, private _cdr: ChangeDetectorRef) {
  }

  changeSelectedDate(date: Date) {
    this.setDate(date)
    this.open = !this.open;
    this.selectDate.emit(date)
    this.onChange(date);
  }

  ngOnInit(): void {
    this.setDate(new Date(this.date))
  }
  setDate(date:string|Date|number){
    this.selectedDate.next(date)
  }
  focus() {
    this._elementRef.nativeElement.focus();
  }

  onChange(date: Date) {
  }

  registerOnChange(fn: (date: Date) => any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
  }

  writeValue(obj: Date | string | number): void {
    if(obj){
      this.date = new Date(obj)
      this.setDate(this.date)
    }

  }

}
