import {
  Component,
  OnInit,
  Host,
  OnDestroy,
  ViewContainerRef,
  Input,
  HostListener,
  HostBinding,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RadioComponent } from '../radio/radio.component';

@Component({
  selector: 'teta-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class RadioButtonComponent implements OnInit, OnDestroy {
  @HostBinding('class.radio-button')
  radioButton = true;

  @HostBinding('class.radio-button-selected')
  selected: boolean;

  @Input()
  @HostBinding('class.radio-button-checked')
  checked: boolean;

  @Input()
  @HostBinding('class.radio-button_disabled')
  disabled: boolean;

  @Input() set value(val: any) {
    this._value = val;
  }

  get value() {
    if (this._value === undefined) {
      if (this.container.element.nativeElement instanceof HTMLElement) {
        return this.container.element.nativeElement.innerText;
      }
    }
    return this._value;
  }

  private _value: any;

  constructor(private container: ViewContainerRef, @Host() public radio: RadioComponent) {}

  @HostListener('click')
  hostClick() {
    if (!this.disabled) {
      this.radio._setChecked(this);
    }
  }

  ngOnInit() {
    this.radio._addButton(this);
  }

  ngOnDestroy(): void {
    this.radio._removeButton(this);
  }
}
