import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DOCUMENT, NgClass } from '@angular/common';
import { IconComponent } from '../../icon/icon/icon.component';
import { ResizeDragDirective } from '../../../directive/resize-drag/resize-drag.directive';

@Component({
    selector: 'teta-resize-panel',
    templateUrl: './resize-panel.component.html',
    styleUrls: ['./resize-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ResizeDragDirective,
        NgClass,
        IconComponent,
    ],
})
export class ResizePanelComponent implements OnInit, OnDestroy {
  @Input() size = 8;

  @Input()
  set direction(val: 'vertical' | 'horizontal') {
    this._direction = val;
  }

  get direction() {
    return this._direction;
  }

  get icon() {
    return this.direction === "horizontal" ? 'moreHorizontal' : 'moreVertical'
  }
  @Input()
  set grabPosition(val: 'top' | 'left' | 'bottom' | 'right') {
    this._grabPosition = val;
  }

  get grabPosition() {
    if (this.direction === 'vertical') {
      if (['left', 'right'].includes(this._grabPosition)) {
        return this._grabPosition;
      }
      return 'left';
    }
    if (['top', 'bottom'].includes(this._grabPosition)) {
      return this._grabPosition;
    }
    return 'bottom';
  }

  @Input() name: string;
  @Input() minSize: number;
  @Input() maxSize: number;
  @HostBinding('class.resize-panel') private readonly resizePanelClass = true;

  private _direction: 'vertical' | 'horizontal' = 'horizontal';
  private _grabPosition: 'top' | 'left' | 'bottom' | 'right' = 'left';
  private _startSize: number;
  private _startPosition: number;

  private _positionMap: Map<string, string> = new Map<string, string>()
    .set('left', 'resize-grab_left')
    .set('right', 'resize-grab_right')
    .set('top', 'resize-grab_top')
    .set('bottom', 'resize-grab_bottom');

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private _document: any
  ) {
  }

  resizeStart(event: MouseEvent) {
    this.setStartPosition();
    if (this.direction === 'vertical') {
      this._startSize = this._elementRef.nativeElement.clientWidth;
      this._startPosition = event.clientX;
    } else {
      this._startSize = this._elementRef.nativeElement.clientHeight;
      this._startPosition = event.clientY;
    }
  }

  resizeProcess(event: MouseEvent) {
    event.preventDefault();
    if (this.direction === 'vertical') {
      this.manageVertical(event);
    } else {
      this.manageHorizontal(event);
    }
  }

  resizeEnd(event: MouseEvent) {
    window.dispatchEvent(new Event('resize'));
  }

  ngOnInit() {
    this.restorePosition();
  }

  ngOnDestroy(): void {
  }

  getClassName() {
    return this._positionMap.get(this.grabPosition) || '';
  }

  private setStartPosition() {
    if (this.direction === 'vertical') {
      this._renderer.setStyle(
        this._elementRef.nativeElement,
        'width',
        `${this._elementRef.nativeElement.offsetWidth}px`
      );
    } else {
      this._renderer.setStyle(
        this._elementRef.nativeElement,
        'height',
        `${this._elementRef.nativeElement.offsetHeight}px`
      );
    }
    this._renderer.setStyle(this._elementRef.nativeElement, 'flex-grow', `0`);
    this._renderer.setStyle(this._elementRef.nativeElement, 'flex-shrink', `0`);
    this._renderer.setStyle(this._elementRef.nativeElement, 'flex', `none`);
  }

  private manageHorizontal(event: MouseEvent) {
    let newSize =
      this.grabPosition === 'bottom'
        ? this._startSize + (event.clientY - this._startPosition)
        : this._startSize - (event.clientY - this._startPosition);
    if (this.maxSize && newSize > this.maxSize) {
      newSize = this.maxSize;
    }
    if (this.minSize && newSize < this.minSize) {
      newSize = this.minSize;
    }
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'height',
      `${newSize}px`
    );
    this.save();
  }

  private manageVertical(event: MouseEvent) {
    let newSize =
      this.grabPosition === 'right'
        ? this._startSize + (event.clientX - this._startPosition)
        : this._startSize - (event.clientX - this._startPosition);
    if (this.maxSize && newSize > this.maxSize) {
      newSize = this.maxSize;
    }
    if (this.minSize && newSize < this.minSize) {
      newSize = this.minSize;
    }
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'width',
      `${newSize}px`
    );
    this.save();
  }

  private restore() {
    if (this.name?.length > 0) {
      return JSON.parse(localStorage.getItem(`resize-panel${this.name}`));
    }
  }

  private restorePosition() {
    const savedSize = this.restore();
    if (savedSize) {
      if (this.direction === 'vertical') {
        this._renderer.setStyle(
          this._elementRef.nativeElement,
          'width',
          `${savedSize}px`
        );
      } else {
        this._renderer.setStyle(
          this._elementRef.nativeElement,
          'height',
          `${savedSize}px`
        );
      }
      this._renderer.setStyle(this._elementRef.nativeElement, 'flex-grow', `0`);
      this._renderer.setStyle(
        this._elementRef.nativeElement,
        'flex-shrink',
        `0`
      );
      this._renderer.setStyle(this._elementRef.nativeElement, 'flex', `none`);
    }
  }

  private save() {
    if (this.name?.length > 0) {
      if (this.direction === 'vertical') {
        localStorage.setItem(
          `resize-panel${this.name}`,
          this._elementRef.nativeElement.clientWidth
        );
      } else {
        localStorage.setItem(
          `resize-panel${this.name}`,
          this._elementRef.nativeElement.clientHeight
        );
      }
    }
  }
}
