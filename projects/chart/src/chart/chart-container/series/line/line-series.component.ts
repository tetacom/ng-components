import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BasePoint } from '../../../model/base-point';
import { LinearSeriesBaseComponent } from '../linear-series-base.component';
import { AsyncPipe } from '@angular/common';
import { DraggablePointDirective } from '../../../directives/draggable-point.directive';

@Component({
  selector: 'svg:svg[teta-line-series]',
  templateUrl: './line-series.component.html',
  styleUrls: ['./line-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, DraggablePointDirective],
})
export class LineSeriesComponent<T extends BasePoint>
  extends LinearSeriesBaseComponent<T>
  implements OnInit, OnDestroy
{
  private start: { x: number; y: number };
  private labelStart: { dx: number; dy: number };

  moveStart(event, point) {
    this.start = { x: point.x, y: point.y };
  }

  moveEnd(event, point) {
    point.x = this.x.invert(this.x(this.start.x) + event.deltaX);
    point.y = this.y.invert(this.y(this.start.y) + event.deltaY);
    this._update.next();
    const emitEvent = {
      type: 'end',
      sourceEvent: event,
    };
    this.svc.emitPoint({
      target: {
        series: this.series(),
        point: point,
      },
      event: emitEvent,
    });
  }

  moveProcess(event, point) {
    point.x = this.x.invert(this.x(this.start.x) + event.deltaX);
    point.y = this.y.invert(this.y(this.start.y) + event.deltaY);
    this._update.next();
    const emitEvent = {
      type: 'drag',
      sourceEvent: event,
    };
    this.svc.emitPoint({
      target: {
        series: this.series(),
        point: point,
      },
      event: emitEvent,
    });
  }

  startLabel(event, label) {
    this.labelStart = { dx: label.dx, dy: label.dy };
  }

  moveLabel(event, label) {
    label.dx = this.labelStart.dx + event.deltaX;
    label.dy = this.labelStart.dy + event.deltaY;
  }

  allowDrag = (point: BasePoint) => {
    return (newPoint) => {
      if (point.marker.minX !== null && point.marker.minX !== undefined) {
        if (this.x.invert(this.x(this.start.x) + newPoint.deltaX) < point.marker.minX) {
          return false;
        }
      }
      if (point.marker.maxX !== null && point.marker.maxX !== undefined) {
        if (this.x.invert(this.x(this.start.x) + newPoint.deltaX) > point.marker.maxX) {
          return false;
        }
      }
      if (point.marker.minY !== null && point.marker.minY !== undefined) {
        if (this.y.invert(this.y(this.start.y) + newPoint.deltaY) < point.marker.minY) {
          return false;
        }
      }
      if (point.marker.maxY !== null && point.marker.maxY !== undefined) {
        if (this.y.invert(this.y(this.start.y) + newPoint.deltaY) > point.marker.maxY) {
          return false;
        }
      }
      return true;
    };
  };
}
