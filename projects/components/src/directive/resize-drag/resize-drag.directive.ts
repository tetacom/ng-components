import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[tetaResizeDrag]',
})
export class ResizeDragDirective {
  @Input() tetaResizeDrag: 'horizontal' | 'vertical' = 'vertical';

  @Output() resizeStart = new EventEmitter<MouseEvent>();
  @Output() resizeProcess = new EventEmitter<MouseEvent>();
  @Output() resizeEnd = new EventEmitter<MouseEvent>();

  @HostBinding('class.resize-drag_active')
  private _active: boolean;

  @HostBinding('class.resize-drag_horizontal')
  private get horizontal() {
    return this.tetaResizeDrag === 'horizontal';
  }

  @HostBinding('class.resize-drag_vertical')
  private get vertical() {
    return this.tetaResizeDrag === 'vertical';
  }

  constructor(@Inject(DOCUMENT) private _document: any) {}

  @HostListener('mousedown', ['$event']) mouseDown(event: MouseEvent) {
    this.resizeStart.emit(event);
    this.addListeners();
  }

  private addListeners() {
    this._active = true;
    this._document.addEventListener('mouseup', this.handleMouseUp);
    this._document.addEventListener('mousemove', this.handleMouseMove);
  }

  private removeListeners() {
    this._active = false;
    this._document.removeEventListener('mouseup', this.handleMouseUp);
    this._document.removeEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseUp = (event: MouseEvent) => {
    this.resizeEnd.emit(event);
    this.removeListeners();
  };

  private handleMouseMove = (event: MouseEvent) => {
    this.resizeProcess.emit(event);
  };
}
