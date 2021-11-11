import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const SLIDER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProgressBarComponent),
  multi: true,
};

@Component({
  selector: 'teta-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  providers: [SLIDER_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnInit, ControlValueAccessor {
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 0;

  @ViewChild('progressSlider', { static: true })
  private readonly slider: ElementRef;
  @HostBinding('class.progress') private readonly progressBar = true;

  percent: number;
  moving: boolean;

  set value(value: number) {
    this._value = value;
    this.percent = this.setPercentFromValue();
    this._cdr.detectChanges();
  }

  get value() {
    return this._value;
  }

  get containerPosition() {
    const rect = this._elementRef.nativeElement.getBoundingClientRect();
    return { min: rect.x, max: rect.x + rect.width };
  }

  private _value;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private _document: any
  ) {}

  @HostListener('document:mouseup', ['$event']) mouseup() {
    this.moving = false;
    this.restoreGlobalMouseEvents();
    this.removeListener();
  }

  @HostListener('click', ['$event']) click = (event: MouseEvent) => {
    this.getMousePositionInPercents(event);
  };

  onChange(_: any) {}

  onTouched() {}

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(value: number): void {
    this.value = value;
  }

  mousedown = () => {
    this.moving = true;
    this.preventGlobalMouseEvents();
    this.addListener();
  };

  ngOnInit(): void {}

  private mousemove = (event: MouseEvent) => {
    event.preventDefault();
    this.getMousePositionInPercents(event);
  };

  private getMousePositionInPercents = (event: MouseEvent) => {
    const position = event.clientX - this.containerPosition.min;
    let percent =
      (100 / (this.containerPosition.max - this.containerPosition.min)) *
      position;
    percent = percent <= 0 ? 0 : percent > 100 ? 100 : percent;
    this.setValue(this.getValueFromPercent(percent));
  };

  private setValue(value: number) {
    this.value = value;
    this.onChange(this.value);
  }

  private getValueFromPercent(percent: number): number {
    if (percent === 0) {
      return this.min;
    }
    if (percent === 100) {
      return this.max;
    }
    const exactValue = this.min + (percent * (this.max - this.min)) / 100;
    if (!this.step || this.step <= 0 || isNaN(this.step)) {
      return exactValue;
    }
    return (
      Math.round((exactValue - this.min) / this.step) * this.step + this.min
    );
  }

  private preventGlobalMouseEvents = () => {
    this._document.body.style['pointer-events'] = 'none';
  };

  private restoreGlobalMouseEvents = () => {
    this._document.body.style['pointer-events'] = 'auto';
  };

  private addListener() {
    this._document.addEventListener('mousemove', this.mousemove);
  }

  private removeListener() {
    this._document.removeEventListener('mousemove', this.mousemove);
  }

  private setPercentFromValue() {
    const range = this.max - this.min;
    return (100 / range) * (this.value - this.min);
  }
}
