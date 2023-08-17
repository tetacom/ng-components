import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'teta-color-input',
  templateUrl: './color-input.component.html',
  styleUrls: ['./color-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorInputComponent implements ControlValueAccessor {
  @Input() disabled = false;
  @ViewChild('input', { static: false }) input: ElementRef;
  value = '';

  constructor(private _cdr: ChangeDetectorRef) {}

  @HostListener('click') onFocus() {
    if (this.disabled) {
      return;
    }
    this.input.nativeElement.focus();
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

  onChange(input: string): void {}

  onTouched(): void {}

  getHexColor(color: string) {
    if (color && color.startsWith('rgb')) {
      const value = color.substring(
        color.indexOf('(') + 1,
        color.lastIndexOf(')')
      );
      const colorArray = value.split(',');
      color = `#${('00' + parseInt(colorArray[0], 10).toString(16)).slice(
        -2
      )}${('00' + parseInt(colorArray[1], 10).toString(16)).slice(-2)}${(
        '00' + parseInt(colorArray[2], 10).toString(16)
      ).slice(-2)}`;
    }
    return color;
  }
}
