import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  forwardRef,
  HostBinding,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button/radio-button.component';

type ButtonOrNullOrUndefined = RadioButtonComponent | undefined | null;

@Component({
  selector: 'teta-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent implements OnInit, ControlValueAccessor {
  @HostBinding('tabindex') tabindex = 0;
  @HostBinding('class.radio') radioClass = true;

  /** Менять значение при изменении выбранного */
  @Input()
  @HostBinding('class.radio_inline')
  inline: boolean;

  @Input() checkChangeSelected = true;

  @Input() set disabled(val: boolean) {
    this.disabled$ = val;
    this.buttons$.forEach(b => (b.disabled = this.disabled));
  }

  get disabled() {
    return this.disabled$;
  }

  @Input() get value(): any {
    if (this.checkedButton$) {
      return this.checkedButton$.value;
    }
    return null;
  }

  set value(val: any) {
    this.writeValue(val);
  }

  private buttons$: RadioButtonComponent[] = [];
  private checkedButton$: ButtonOrNullOrUndefined;
  private selectedButton$: ButtonOrNullOrUndefined;
  private disabled$ = false;

  constructor(private _cdr: ChangeDetectorRef) {}

  @HostListener('focus', ['$event'])
  focusHandler(event: FocusEvent) {
    this.selectFirst();
  }

  @HostListener('focusout', ['$event'])
  focusoutHandler(event: FocusEvent) {
    if (this.selectedButton$) {
      this.selectedButton$.selected = false;
      this.selectedButton$ = null;
    }
  }

  @HostListener('keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const key = event.code || event.key;
    switch (key) {
      case 'Space':
      case 'Enter':
      case 'Spacebar':
        this.checkSelected();
        break;

      case 'ArrowUp':
      case 'Up':
      case 'ArrowLeft':
      case 'Left':
        this.selectPrevious();
        break;

      case 'ArrowDown':
      case 'Down':
      case 'ArrowRight':
      case 'Right':
        this.selectNext();
        break;
      default:
        return;
    }

    event.cancelBubble = true;
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    return false;
  }

  ngOnInit() {}

  selectFirst() {
    if (!this.selectedButton$) {
      if (this.checkedButton$) {
        this.selectedButton$ = this.checkedButton$;
        this.selectedButton$.selected = true;
        return true;
      }

      for (const btn of this.buttons$) {
        if (!btn.disabled) {
          this.selectedButton$ = btn;
          this.selectedButton$.selected = true;
          return true;
        }
      }
    }
    return false;
  }

  _setChecked(btn: RadioButtonComponent) {
    if (this.checkedButton$) {
      this.checkedButton$.checked = false;
    }
    this.checkedButton$ = btn;
    this.checkedButton$.checked = true;
    if (this.selectedButton$) {
      this.selectedButton$.selected = false;
    }
    this.selectedButton$ = btn;
    this.selectedButton$.selected = true;
    this._onChange(this.value);
    this._cdr.markForCheck();
  }

  _addButton(btn: RadioButtonComponent) {
    if (this.disabled) {
      btn.disabled = this.disabled;
    }
    return this.buttons$.push(btn) - 1;
  }

  _removeButton(btn: RadioButtonComponent) {
    const index = this.buttons$.indexOf(btn);
    if (index > -1) {
      this.buttons$.splice(index, 1);
    }
  }

  /** Writes a new value to the element. */
  writeValue(obj: any): void {
    if (this.checkedButton$) {
      this.checkedButton$.checked = false;
    }

    this.checkedButton$ = this.buttons$.find(b => b.value === obj);
    if (this.checkedButton$) {
      this.checkedButton$.checked = true;
    }
    this._cdr.markForCheck();
  }

  /** model callback вызовется когда модель измениться из ui */
  _onChange: (value: any) => void = () => {};

  /** Registers a callback function that should be called when the control's value changes in the UI */
  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  _onTouched = () => {};

  /** Registers a callback function that should be called when the control receives a blur event. */
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  /** This function is called by the forms API when the control status changes to or from "DISABLED". */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cdr.markForCheck();
  }

  private selectBtn(btn: RadioButtonComponent) {
    if (this.selectedButton$) {
      this.selectedButton$.selected = false;
    }
    this.selectedButton$ = btn;
    this.selectedButton$.selected = true;
    if (this.checkChangeSelected) {
      this.checkSelected();
    }
    this._cdr.markForCheck();
  }

  private selectNext() {
    if (this.selectFirst()) {
      return;
    }

    const length = this.buttons$.length;
    let newIndex = this.selectedButton$
      ? this.buttons$.indexOf(this.selectedButton$)
      : 0;
    let firstCycle = true;
    do {
      newIndex++;
      if (firstCycle && newIndex === length) {
        newIndex = 0;
        firstCycle = false;
      }
      const btn = this.buttons$[newIndex];
      if (btn && !btn.disabled) {
        this.selectBtn(btn);
        return;
      }
    } while (newIndex < length);
  }

  private selectPrevious() {
    if (this.selectFirst()) {
      return;
    }

    let newIndex = this.selectedButton$
      ? this.buttons$.indexOf(this.selectedButton$)
      : 0;
    let firstCycle = true;
    do {
      newIndex--;
      if (firstCycle && newIndex === -1) {
        newIndex = this.buttons$.length - 1;
        firstCycle = false;
      }
      const btn = this.buttons$[newIndex];
      if (btn && !btn.disabled) {
        this.selectBtn(btn);
        return;
      }
    } while (newIndex >= 0);
  }

  private checkSelected() {
    if (this.selectFirst()) {
      return;
    }
    if (this.selectedButton$) {
      this._setChecked(this.selectedButton$);
    }
  }
}
