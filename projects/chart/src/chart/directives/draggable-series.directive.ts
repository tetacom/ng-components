import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
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
  @Input() tetaDraggableSeries: boolean;
  @Input() dragDirection: DragPointType = DragPointType.xy;

  @Output() moveStart = new EventEmitter<SeriesDragEvent>();
  @Output() moveProcess = new EventEmitter<SeriesDragEvent>();
  @Output() moveEnd = new EventEmitter<SeriesDragEvent>();

  private startPosition: { x: number; y: number };

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

    this.moveStart.emit({
      x: event.clientX,
      y: event.clientY,
      deltaX: 0,
      deltaY: 0,
    });
  }

  @HostListener('window:pointermove', ['$event'])
  pointerMove(event: PointerEvent) {
    if (!this.startPosition) {
      return;
    }

    const nextOffset = this.getNextOffset(event);

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

    this.moveEnd.emit({
      x: event.clientX,
      y: event.clientY,
      deltaX: nextOffset.x,
      deltaY: nextOffset.y,
    });

    this.startPosition = null;
  }

  resetTransform() {
    this.startPosition = null;
  }

  private getNextOffset(event: PointerEvent) {
    let deltaX = event.clientX - this.startPosition.x;
    let deltaY = event.clientY - this.startPosition.y;

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
}
