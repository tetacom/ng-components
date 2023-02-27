import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {viewType} from "../../../common/model/view-type.model";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Align} from "../../../common/enum/align.enum";
import {VerticalAlign} from "../../../common/enum/vertical-align.enum";

@Component({
  selector: 'teta-d-picker',
  templateUrl: './d-picker.component.html',
  styleUrls: ['./d-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DPickerComponent}]

})

export class DPickerComponent implements OnInit, ControlValueAccessor {
  public open = false;
  @Input() date: Date | string | number = new Date();
  @Input() locale: string = 'ru';
  @Input() min: Date | string | number = null;
  @Input() max: Date | string | number = null;
  @Input() invalid:boolean=false;
  @Input() disabled:boolean=false;
  @Input() align: Align = Align.left;
  @Input() verticalAlign: VerticalAlign = VerticalAlign.auto;
  @Input() viewType: viewType = 'rounded'
  @Output() selectDate: EventEmitter<Date> = new EventEmitter<Date>()
  public selectedDate: ReplaySubject<Date | string | number> = new ReplaySubject<Date | string | number>(1)

  changeSelectedDate(date: Date) {
    this.selectedDate.next(date)
    this.open = !this.open;
    this.selectDate.emit(date)
    this.onChange(date);
  }

  ngOnInit(): void {

    this.selectedDate.next(new Date(this.date))
  }

  onChange(date: Date) {
  }

  registerOnChange(fn: (date: Date) => any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: Date | string | number): void {
    this.date = new Date(obj)
  }

}
