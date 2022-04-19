import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'teta-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() leftIconName?: string;
  @HostBinding('class.text-field_disabled')
  @Input()
  disabled = false;
  @Input() onlyNumber = false;
  @HostBinding('class.text-field_invalid')
  @Input()
  invalid: boolean;
  @ViewChild('input', {static: false}) input: ElementRef;

  @HostBinding('attr.tabindex')
  private get tabindex() {
    return this.disabled ? null : 0;
  }

  @HostBinding('class.text-field')
  private readonly textField = true;
  value = '';

  constructor(private _cdr: ChangeDetectorRef) {
  }

  @HostListener('click') onFocus() {
    if (this.disabled) {
      return;
    }
    this.input.nativeElement.focus();
  }

  keyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.input.nativeElement.blur();
    }
  }

  emitBlur() {
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cdr.markForCheck();
  }

  writeValue(input: string): void {
    this.value = input;
    this._cdr.detectChanges();
  }

  onChange(input: string): void {
  }

  onTouched(): void {
  }
}
