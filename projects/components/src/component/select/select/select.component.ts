import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  HostBinding,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

import { AutoCloseIgnoreCase } from '../../../common/contract/auto-close-ignore-case';
import { Align } from '../../../common/enum/align.enum';
import { VerticalAlign } from '../../../common/enum/vertical-align.enum';
import { viewType } from '../../../common/model/view-type.model';
import { TetaConfigService } from '../../../locale/teta-config.service';
import { TetaLocalisation } from '../../../locale/teta-localisation';
import { SelectOptionDirective } from '../select-option.directive';
import { SelectValueDirective } from '../select-value.directive';

@Component({
  selector: 'teta-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {
  @HostBinding('class.select_multiple')
  @Input()
  multiple: boolean;

  @Input() set options(options: any[]) {
    this._options = options;
    if (
      this._internalValue !== null &&
      this._internalValue !== undefined &&
      this.options
    ) {
      this.getSelectedValue(this._internalValue);
    }
  }

  get options() {
    return this._options;
  }

  @Input() invalid: boolean;
  @Input() align: Align = Align.minWidth;
  @Input() verticalAlign: VerticalAlign = VerticalAlign.auto;
  @Input() autoClose = true;
  @Input() autoCloseIgnore: Array<AutoCloseIgnoreCase> = ['inside'];
  @Input() disabled: boolean;
  @Input() itemSize = 32;
  @Input() virtual: boolean;
  @Input() icon: string;
  @Input() placeholder: string;
  @Input() appendToBody: boolean;
  @Input() allowNull = true;
  @Input() viewType: viewType = 'rounded';
  @Input() notFoundText: string;
  @Input() valueRef: ((item: any) => any) | string;
  @Input() textRef: ((item: any) => string) | string;
  @Input() searchRef: string | ((item: any) => string);

  @ContentChild(SelectOptionDirective, { static: true })
  optionDirective: SelectOptionDirective;

  @ContentChild(SelectValueDirective, { static: true })
  valueDirective: SelectValueDirective;

  @HostBinding('class.select_open') open = false;

  @HostBinding('class.select') private readonly selectClass = true;

  @HostBinding('tabindex')
  private get tabindex() {
    return this.disabled ? null : 0;
  }

  @HostBinding('class.select_disabled')
  get isDisabled() {
    return this.disabled;
  }

  value: any | any[];
  searchText: string;
  locale: Observable<TetaLocalisation>;

  get visibleOptions(): any[] {
    if (!this.searchText) {
      return this.options;
    }
    return this.options?.filter(
      option =>
        this.getSearchString(option)
          .toLowerCase()
          .indexOf(this.searchText.toLowerCase()) >= 0
    );
  }

  private _options: any | any[];
  private _internalValue: any;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _config: TetaConfigService
  ) {
    this.locale = this._config.locale;
  }

  clear() {
    let val: any;
    if (this.multiple === true) {
      val = [];
    } else {
      val = null;
    }
    this.value = val;
    this.onChange(this.value);
    this.open = false;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  clickOption(option: any, event: MouseEvent): void {
    if (this.multiple === true) {
      if (!this.value?.length) {
        this.value = [];
      }
      if (this.value.indexOf(option) >= 0) {
        this.removeItem(option);
      } else {
        this.value = [...this.value, option];
      }
      this._internalValue = this.value.map(_ => this.getValue(_));
      this.onChange(this._internalValue);
    } else {
      this.value = option;
      this._internalValue = this.getValue(this.value);
      this.onChange(this._internalValue);
      this.open = false;
    }
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  itemSelected(option: any): boolean {
    if (this.multiple) {
      return this.value?.indexOf(option) >= 0;
    } else {
      return this.value === option;
    }
  }

  removeItemClick(option: any, event: MouseEvent): void {
    event.stopPropagation();
    this.removeItem(option);
    this._internalValue = this.value.map(_ => this.getValue(_));
    this.onChange(this._internalValue);
  }

  removeItem(option: any): void {
    this.value = this.value.filter(_ => _ !== option);
  }

  search(text: string): void {
    this.searchText = text;
  }

  getText(option: any): string {
    if (option == null) {
      return '';
    }
    switch (typeof this.textRef) {
      case 'string':
        return option[this.textRef];
      case 'function':
        return this.textRef(option);
      default:
        return option;
    }
  }

  getValue(option: any): any {
    switch (typeof this.valueRef) {
      case 'string':
        return option[this.valueRef];
      case 'function':
        return this.valueRef(option);
      default:
        return option;
    }
  }

  getSearchString(option: any): string {
    switch (typeof this.searchRef) {
      case 'string':
        return option[this.searchRef];
      case 'function':
        return this.searchRef(option);
      default:
        return '';
    }
  }

  focus() {
    this._elementRef.nativeElement.focus();
  }

  writeValue(value: any | any[]): void {
    this._internalValue = value;
    this.getSelectedValue(value);
    this._cdr.detectChanges();
  }

  onChange: (value: any) => void = () => {};

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  onTouched = () => {};

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cdr.markForCheck();
  }

  private getSelectedValue(value: any | any[]) {
    if (this.multiple) {
      this.value =
        value && this.options
          ? this.options.filter(
              option => value.indexOf(this.getValue(option)) > -1
            )
          : [];
    } else {
      this.value =
        this.options &&
        this.options?.find(option => this.getValue(option) === value);
    }
  }
}
