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
import { NgTemplateOutlet } from '@angular/common';
import { IconComponent } from '../../icon/icon/icon.component';

export const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true,
};

@Component({
  selector: 'teta-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IconComponent, NgTemplateOutlet],
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @HostBinding('attr.tabindex') tabindex = 0;

  @Input() class;

  @HostBinding('class')
  private get getClass() {
    const result = [this.class, 'checkbox'];
    if (this.palette) {
      result.push(`checkbox-${this.palette}`);
    }
    return result.join(' ');
  }

  @Input() palette = 'primary';
  @Input() noLabel: boolean;

  /**
   * компонент неактивен
   */
  @HostBinding('class.checkbox_disabled')
  @Input()
  disabled: boolean;
  /**
   * true/false или list
   */
  @Input() value: any;
  /**
   * true/false или list
   */
  @Input() binary: boolean;
  @Input() labelPosition: 'left' | 'right' = 'right';
  @Input() allowNull: boolean;

  checked: boolean;

  /**
   * Значение
   */
  private model$: any = null;

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
    if (this.binary) {
      this.model = !this.model;
    } else {
      if (!this.isChecked()) {
        this.addValue();
      } else {
        this.removeValue();
      }
    }
    this.checked = this.isChecked();
  }

  writeValue(model: any) {
    if (this.binary) {
      this.model$ = model;
    } else {
      if (model && model instanceof Array) {
        this.model$ = model;
      } else {
        this.model$ = [];
      }
    }
    this.checked = this.isChecked();
    this.cdr.detectChanges();
  }

  isChecked(): boolean {
    if (this.binary) {
      return this.allowNull ? this.model : !!this.model;
    } else {
      return this.model && this.model.indexOf(this.value) >= 0;
    }
  }

  removeValue() {
    this.model = this.model.filter((val: any) => val !== this.value);
  }

  addValue() {
    if (this.model) {
      this.model = [...this.model, this.value];
    } else {
      this.model = [this.value];
    }
  }

  ngOnInit() {}

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
    this.cdr.detectChanges();
  }
}
