import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DragPointType } from '../model/enum/drag-point-type';

@Directive({
  selector: '[tetaDraggablePoint]',
  exportAs: 'tetaDraggablePoint',
  standalone: true,
})
export class DraggablePointDirective {
  @Input() tetaDraggablePoint: boolean;
  @Input() dragDirection: DragPointType;
  @Input() allowDrag: (point: { x: number; y: number; deltaX: number; deltaY: number }) => boolean;

  private startPosition: {
    x: number;
    y: number;
  };

  private transformCache: {
    x: number;
    y: number;
  };

  constructor(private _elementRef: ElementRef) {}

  @Output() moveStart = new EventEmitter<{
    x: number;
    y: number;
  }>();

  @Output() moveProcess = new EventEmitter<{
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
  }>();

  @Output() moveEnd = new EventEmitter<{
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
  }>();

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  mouseDown(event: MouseEvent) {
    if (!this.tetaDraggablePoint) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.startPosition = {
      x: event.x,
      y: event.y,
    };
    this.moveStart.emit(this.startPosition);
  }

  @HostListener('window:mouseup', ['$event'])
  @HostListener('window:touchend', ['$event'])
  mouseUp(event: MouseEvent) {
    if (this.startPosition !== null && this.startPosition !== undefined) {
      let deltaX = event.x - this.startPosition.x;
      let deltaY = event.y - this.startPosition.y;
      if (this.dragDirection === DragPointType.x) {
        deltaY = 0;
      }
      if (this.dragDirection === DragPointType.y) {
        deltaX = 0;
      }
      if (
        this.allowDrag &&
        !this.allowDrag({
          x: event.x,
          y: event.y,
          deltaX,
          deltaY,
        })
      ) {
        this.startPosition = null;
        return;
      }
      if (this.transformCache) {
        this.transformCache.x = this.transformCache.x + deltaX;
        this.transformCache.y = this.transformCache.y + deltaY;
      } else {
        this.transformCache = {
          x: deltaX,
          y: deltaY,
        };
      }
      this.moveEnd.emit({
        x: event.x,
        y: event.y,
        deltaX,
        deltaY,
      });
    }
    this.startPosition = null;
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  mouseMove(event: MouseEvent) {
    if (this.startPosition) {
      let deltaX = event.x - this.startPosition.x;
      let deltaY = event.y - this.startPosition.y;
      if (this.transformCache) {
        deltaX = this.transformCache.x + deltaX;
        deltaY = this.transformCache.y + deltaY;
      }
      if (
        this.allowDrag &&
        !this.allowDrag({
          x: event.x,
          y: event.y,
          deltaX,
          deltaY,
        })
      ) {
        return;
      }
      if (this.dragDirection === DragPointType.x) {
        deltaY = 0;
      }
      if (this.dragDirection === DragPointType.y) {
        deltaX = 0;
      }
      this.setTransform(deltaX, deltaY);
      event.stopPropagation();
      event.preventDefault();
      this.moveProcess.emit({
        x: event.x,
        y: event.y,
        deltaX,
        deltaY,
      });
    }
  }

  setTransform(x: number, y: number) {
    this._elementRef.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
  }

  resetTransform() {
    this.setTransform(0, 0);
    this.transformCache = null;
  }
}
