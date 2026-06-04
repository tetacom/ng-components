import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { DragPointType } from '../model/enum/drag-point-type';

export interface SeriesDragEvent {
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
}

@Directive({
  selector: '[tetaDraggableSeries]',
  exportAs: 'tetaDraggableSeries',
  standalone: true,
})
export class DraggableSeriesDirective {
  private elementRef = inject<ElementRef<SVGGraphicsElement>>(ElementRef);

  @Input() tetaDraggableSeries: boolean;
  @Input() dragDirection: DragPointType = DragPointType.xy;

  @Output() moveStart = new EventEmitter<SeriesDragEvent>();
  @Output() moveProcess = new EventEmitter<SeriesDragEvent>();
  @Output() moveEnd = new EventEmitter<SeriesDragEvent>();

  private startPosition: { x: number; y: number };
  private startOffset = { x: 0, y: 0 };
  private currentOffset = { x: 0, y: 0 };

  @HostListener('pointerdown', ['$event'])
  pointerDown(event: PointerEvent) {
    if (!this.tetaDraggableSeries) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    this.startPosition = {
      x: event.clientX,
      y: event.clientY,
    };
    this.startOffset = { ...this.currentOffset };

    this.moveStart.emit({
      x: event.clientX,
      y: event.clientY,
      deltaX: this.currentOffset.x,
      deltaY: this.currentOffset.y,
    });
  }

  @HostListener('window:pointermove', ['$event'])
  pointerMove(event: PointerEvent) {
    if (!this.startPosition) {
      return;
    }

    const nextOffset = this.getNextOffset(event);
    this.setTransform(nextOffset.x, nextOffset.y);
    this.currentOffset = nextOffset;

    event.stopPropagation();
    event.preventDefault();

    this.moveProcess.emit({
      x: event.clientX,
      y: event.clientY,
      deltaX: nextOffset.x,
      deltaY: nextOffset.y,
    });
  }

  @HostListener('window:pointerup', ['$event'])
  @HostListener('window:pointercancel', ['$event'])
  pointerUp(event: PointerEvent) {
    if (!this.startPosition) {
      return;
    }

    const nextOffset = this.getNextOffset(event);
    this.setTransform(nextOffset.x, nextOffset.y);
    this.currentOffset = nextOffset;

    this.moveEnd.emit({
      x: event.clientX,
      y: event.clientY,
      deltaX: nextOffset.x,
      deltaY: nextOffset.y,
    });

    this.startPosition = null;
  }

  resetTransform() {
    this.currentOffset = { x: 0, y: 0 };
    this.startOffset = { x: 0, y: 0 };
    this.setTransform(0, 0);
  }

  private getNextOffset(event: PointerEvent) {
    let deltaX = this.startOffset.x + event.clientX - this.startPosition.x;
    let deltaY = this.startOffset.y + event.clientY - this.startPosition.y;

    if (this.dragDirection === DragPointType.x) {
      deltaY = 0;
    }

    if (this.dragDirection === DragPointType.y) {
      deltaX = 0;
    }

    return {
      x: deltaX,
      y: deltaY,
    };
  }

  private setTransform(x: number, y: number) {
    this.elementRef.nativeElement.setAttribute('transform', `translate(${x}, ${y})`);
  }
}
