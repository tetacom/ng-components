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
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { NumberPipe } from '../../../pipe/number-pipe/number.pipe';
import { NgClass } from '@angular/common';
import { OnlyNumberDirective } from '../../../directive/only-number/only-number.directive';
import { IconComponent } from '../../icon/icon/icon.component';

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
    standalone: true,
    imports: [
        IconComponent,
        FormsModule,
        OnlyNumberDirective,
        NgClass,
        NumberPipe,
    ],
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() leftIconName?: string;
  @HostBinding('class.text-field_disabled')
  @Input()
  disabled = false;
  @Input() onlyNumber = false;
  @Input() decimalPart: number;
  @HostBinding('class.text-field_invalid')
  @Input()
  invalid: boolean;
  @ViewChild('input', { static: false }) input: ElementRef;
  inputFocused: boolean;
  @HostBinding('class.text-field')
  private readonly textField = true;
  value = '';

  constructor(private _cdr: ChangeDetectorRef) {}

  @HostListener('click') onFocus() {
    if (this.disabled) {
      return;
    }
    this.input.nativeElement.focus();
  }

  keyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.emitBlur();
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

  onChange(input: string): void {}

  onTouched(): void {}
}
