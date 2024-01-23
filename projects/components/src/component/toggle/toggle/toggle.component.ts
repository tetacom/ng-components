import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';

export const TOGGLE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleComponent),
  multi: true,
};

@Component({
    selector: 'teta-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    providers: [TOGGLE_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass],
})
export class ToggleComponent implements ControlValueAccessor {
  @HostBinding('attr.tabindex') tabindex = 0;
  @HostBinding('class.toggle') toggleClass = true;

  get paletteClass() {
    if (this.palette) {
      return `toggle-button-${this.palette}`;
    }
  }

  @Input() palette = 'primary';
  @Input() noLabel: boolean;

  /**
   * компонент неактивен
   */
  @HostBinding('class.toggle_disabled')
  @Input()
  disabled: boolean;

  /**
   * Значение
   */
  private model$: boolean;

  get model(): any {
    return this.model$;
  }

  set model(v: any) {
    if (v !== this.model$) {
      this.model$ = v;
      this.onChange(v);
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  @HostListener('click')
  changeValue() {
    if (this.disabled) {
      return;
    }
    this.model = !this.model;
  }

  writeValue(model: boolean) {
    this.model$ = model;
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

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }
}
