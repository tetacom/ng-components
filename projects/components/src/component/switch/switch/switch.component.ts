import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SwitchService } from '../switch.service';
import { filter, takeWhile } from 'rxjs/operators';
import { viewType } from '../../../common/model/view-type.model';

export const SWITCH_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchComponent),
  multi: true,
};

@Component({
  selector: 'teta-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [SWITCH_CONTROL_VALUE_ACCESSOR, SwitchService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SwitchComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() viewType: viewType = 'rounded';
  @HostBinding('class.switch') switchClass = true;

  @HostBinding('class')
  get class() {
    return `switch_` + this.viewType;
  }

  private _alive = true;
  private _value: any;

  constructor(
    private svc: SwitchService,
    private cdr: ChangeDetectorRef,
  ) {
    this.svc.value
      .pipe(
        takeWhile((_) => this._alive),
        filter((_) => _ !== this._value),
      )
      .subscribe((_) => {
        this.onChange(_);
        this._value = _;
      });
  }

  writeValue(model: any) {
    this._value = model;
    this.svc.setValue(model);
    this.cdr.markForCheck();
  }

  onChange(_: any) {}

  onTouched() {}

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._alive = false;
  }
}
