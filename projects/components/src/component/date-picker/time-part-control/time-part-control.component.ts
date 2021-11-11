import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TIME_PART_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimePartControlComponent),
  multi: true,
};

@Component({
  selector: 'teta-time-part-control',
  templateUrl: './time-part-control.component.html',
  styleUrls: ['./time-part-control.component.scss'],
  providers: [TIME_PART_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePartControlComponent implements OnInit, ControlValueAccessor {
  @Input() min = 0;
  @Input() max = 59;
  @Input() disabled: boolean;

  private _value: number;

  set value(value: number) {
    this._value = value;
    this.onChange(this._value);
  }

  get value() {
    return this._value;
  }

  constructor(private _cdr: ChangeDetectorRef) {}

  up() {
    this.value = this.value < this.max ? this.value + 1 : this.min;
  }

  down() {
    this.value = this.value > this.min ? this.value - 1 : this.max;
  }

  scroll = (e: any) => {
    const delta = e?.deltaY ?? e;

    if (e instanceof WheelEvent) {
      e.preventDefault();
    }
    if (delta > 0) {
      this.down();
    } else {
      this.up();
    }
  };

  ngOnInit() {}

  writeValue(model: number) {
    this._value = model;
    this._cdr.markForCheck();
  }

  onChange(_: any) {}

  onTouched() {}

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
}
