import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[tetaOnlyNumber]',
})
export class OnlyNumberDirective {
  @Input() tetaOnlyNumber = true;
  @Input() allowDecimals = true;
  @Input() allowSign = true;
  @Input() decimalSeparator = '.';
  @Input() commaSeparator = ',';

  private _previousValue = '';

  private _integerUnsigned = '^[0-9]*$';
  private _integerSigned = '^-?[0-9]+$';
  private _decimalUnsigned = '^[0-9]+(.[0-9]+)?$';
  private _decimalSigned = '^-?[0-9]+(.[0-9]+)?$';

  private readonly _minusSign: string = '-';

  constructor(private _elementRef: ElementRef, private _control: NgControl) {
  }

  @HostListener('change', ['$event']) onChange(e: any) {
    if (this.tetaOnlyNumber === false) {
      return;
    }
    this.validateValue(this._elementRef.nativeElement.value);
  }

  @HostListener('paste', ['$event']) onPaste(e: any) {
    if (this.tetaOnlyNumber === false) {
      return;
    }
    this.validateValue(e.clipboardData.getData('text/plain'));
    e.preventDefault();
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (this.tetaOnlyNumber === false) {
      return;
    }
    const cursorPosition: number =
      (e.target as HTMLInputElement).selectionStart ?? 0;
    const originalValue: string = (e.target as HTMLInputElement).value;
    const controlOrCommand = e.ctrlKey === true || e.metaKey === true;
    const signExists = originalValue.includes('-');
    const separatorExists =
      originalValue.includes(this.decimalSeparator) ||
      originalValue.includes(this.commaSeparator);

    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Escape',
      'Tab',
      'Home',
      'End',
    ];

    const separatorIsCloseToSign = signExists && cursorPosition <= 1;
    if (this.allowDecimals && !separatorIsCloseToSign && !separatorExists) {
      // if (this.decimalSeparator === '.') {
      allowedKeys.push('.');
      // } else {
      // allowedKeys.push(',');
      // }
    }

    const firstCharacterIsSeparator =
      originalValue.charAt(0) !== this.decimalSeparator;
    if (
      this.allowSign &&
      !signExists &&
      firstCharacterIsSeparator &&
      cursorPosition === 0
    ) {
      allowedKeys.push('-');
    }

    if (
      allowedKeys.indexOf(e.key) !== -1 ||
      (e.code === 'KeyA' && controlOrCommand) ||
      (e.code === 'KeyC' && controlOrCommand) ||
      (e.code === 'KeyV' && controlOrCommand) ||
      (e.code === 'KeyZ' && controlOrCommand) ||
      (e.code === 'KeyX' && controlOrCommand)
    ) {
      return;
    }
    this._previousValue = originalValue;

    const isNumber = new RegExp(this._integerUnsigned).test(e.key);
    if (isNumber) {
      return;
    } else {
      if (e.key === ',' && originalValue.indexOf('.') < 0) {
        this._elementRef.nativeElement.value =
          `${originalValue.slice(0, cursorPosition)}.${originalValue.slice(cursorPosition)}`;
      }
      e.preventDefault();
    }
  }

  validateValue(value: string): void {
    if (this.tetaOnlyNumber === false) {
      return;
    }
    value = value.replace(',', '.').trim();
    let regex: string = this._integerUnsigned;
    if (!this.allowDecimals && !this.allowSign) {
      regex = this._integerUnsigned;
    }
    if (!this.allowDecimals && this.allowSign) {
      regex = this._integerSigned;
    }
    if (this.allowDecimals && !this.allowSign) {
      regex = this._decimalUnsigned;
    }
    if (this.allowDecimals && this.allowSign) {
      regex = this._decimalSigned;
    }

    let firstCharacter = value.charAt(0);
    if (firstCharacter === this.decimalSeparator) {
      value = 0 + value;
    }

    const lastCharacter = value.charAt(value.length - 1);
    if (lastCharacter === this.decimalSeparator) {
      value = value + 0;
    }

    let signedValue = false;
    if (firstCharacter === this._minusSign) {
      signedValue = true;
      value = value.substring(1);
      firstCharacter = value.charAt(0);
    }
    let secondChar = value.charAt(1);
    while (
      firstCharacter === '0' &&
      secondChar !== '' &&
      secondChar !== this.decimalSeparator
      ) {
      value = value.substring(1);
      firstCharacter = value.charAt(0);
      secondChar = value.charAt(1);
    }
    if (signedValue === true) {
      value = this._minusSign + value;
    }

    const valueParts = value.split(this.decimalSeparator);
    const naturalPart = valueParts?.[0];
    let decimalPart = valueParts?.[1];

    if (decimalPart != null && /^0+$/.test(decimalPart)) {
      decimalPart = '0';
      value = naturalPart + '.' + decimalPart;
    }
    if (value === '-0') {
      value = '0';
    }
    if (value === '-0.0') {
      value = '0.0';
    }
    if (value === null || value === undefined || value === '') {
      return;
    }
    const valid: boolean = new RegExp(regex).test(value.toString());

    // if (valid && value.toString() !== this._control.control.value.toString()) {
    //   console.log(value, parseFloat(value));
    //   this._control.control.patchValue(parseFloat(value));
    // }
    if (valid) {
      this._control.control.patchValue(parseFloat(value));
    }
  }
}
