import { ChangeDetectionStrategy, Component, computed, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasePoint } from '../../../model/base-point';
import { LinearSeriesBaseComponent } from '../linear-series-base.component';
import { AsyncPipe } from '@angular/common';
import { DraggablePointDirective } from '../../../directives/draggable-point.directive';
import { DraggableSeriesDirective, SeriesDragEvent } from '../../../directives/draggable-series.directive';
import { Series } from '../../../model/series';

@Component({
  selector: 'svg:svg[teta-line-series]',
  templateUrl: './line-series.component.html',
  styleUrls: ['./line-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, DraggablePointDirective, DraggableSeriesDirective],
})
export class LineSeriesComponent<T extends BasePoint> extends LinearSeriesBaseComponent<T> implements OnDestroy {
  private start: { x: number; y: number };
  private labelStart: { dx: number; dy: number };
  private seriesPathOffsets = toSignal(this.svc.seriesPathOffsets, { initialValue: new Map() });
  private seriesDragStartOffsets = new Map<number | string, { x: number; y: number }>();
  private seriesDragGroup: Series<BasePoint>[] = [];

  private seriesOffsetValue = computed(() => {
    return this.seriesPathOffsets().get(this.series().id) ?? { x: 0, y: 0 };
  });

  seriesPathTransform = computed(() => {
    const offset = this.seriesOffsetValue();
    const offsetX = this.getOffsetPixels(this.x(), offset.x);
    const offsetY = this.getOffsetPixels(this.y(), offset.y);

    if (!offsetX && !offsetY) {
      return null;
    }

    return `translate(${offsetX}, ${offsetY})`;
  });

  seriesMoveStart(event: SeriesDragEvent) {
    this.seriesDragGroup = this.getPathDragSeriesGroup();
    this.seriesDragStartOffsets = new Map(
      this.seriesDragGroup.map((series) => {
        return [series.id, this.svc.getSeriesPathOffsets().get(series.id) ?? { x: 0, y: 0 }];
      }),
    );
    this.emitSeriesOffset('start', event);
  }

  seriesMoveProcess(event: SeriesDragEvent) {
    this.updateSeriesOffset(event);
    this.emitSeriesOffset('drag', event);
  }

  seriesMoveEnd(event: SeriesDragEvent) {
    this.updateSeriesOffset(event);
    this.emitSeriesOffset('end', event);
  }

  moveStart(event, point) {
    this.start = { x: point.x, y: point.y };
  }

  moveEnd(event, point) {
    point.x = this.x().invert(this.x()(this.start.x) + event.deltaX);
    point.y = this.y().invert(this.y()(this.start.y) + event.deltaY);
    this.update.set({});
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
    point.x = this.x().invert(this.x()(this.start.x) + event.deltaX);
    point.y = this.y().invert(this.y()(this.start.y) + event.deltaY);
    this.update.set({});
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
        if (this.x().invert(this.x()(this.start.x) + newPoint.deltaX) < point.marker.minX) {
          return false;
        }
      }
      if (point.marker.maxX !== null && point.marker.maxX !== undefined) {
        if (this.x().invert(this.x()(this.start.x) + newPoint.deltaX) > point.marker.maxX) {
          return false;
        }
      }
      if (point.marker.minY !== null && point.marker.minY !== undefined) {
        if (this.y().invert(this.y()(this.start.y) + newPoint.deltaY) < point.marker.minY) {
          return false;
        }
      }
      if (point.marker.maxY !== null && point.marker.maxY !== undefined) {
        if (this.y().invert(this.y()(this.start.y) + newPoint.deltaY) > point.marker.maxY) {
          return false;
        }
      }
      return true;
    };
  };

  private emitSeriesOffset(type: 'start' | 'drag' | 'end', event: SeriesDragEvent) {
    const offsetValue = this.seriesOffsetValue();
    const seriesList = this.seriesDragGroup.length ? this.seriesDragGroup : [this.series()];

    this.svc.emitSeriesOffset({
      event: {
        type,
        sourceEvent: event,
      },
      target: {
        series: this.series(),
        seriesList,
        seriesIds: seriesList.map((series) => series.id),
        offsets: seriesList.map((series) => {
          const seriesOffsetValue = this.svc.getSeriesPathOffsets().get(series.id) ?? { x: 0, y: 0 };

          return {
            series,
            seriesId: series.id,
            offsetPx: {
              x: this.getOffsetPixels(this.x(), seriesOffsetValue.x),
              y: this.getOffsetPixels(this.y(), seriesOffsetValue.y),
            },
            offsetValue: seriesOffsetValue,
          };
        }),
        offsetPx: {
          x: this.getOffsetPixels(this.x(), offsetValue.x),
          y: this.getOffsetPixels(this.y(), offsetValue.y),
        },
        offsetValue: {
          x: offsetValue.x,
          y: offsetValue.y,
        },
      },
    });
  }

  private updateSeriesOffset(event: SeriesDragEvent) {
    const dragOffset = {
      x: this.getScaleOffset(this.x(), event.deltaX),
      y: this.getScaleOffset(this.y(), event.deltaY),
    };
    const offsets = new Map(this.svc.getSeriesPathOffsets());
    const seriesList = this.seriesDragGroup.length ? this.seriesDragGroup : [this.series()];

    seriesList.forEach((series) => {
      const startOffset = this.seriesDragStartOffsets.get(series.id) ?? { x: 0, y: 0 };

      offsets.set(series.id, {
        x: startOffset.x + dragOffset.x,
        y: startOffset.y + dragOffset.y,
      });
    });

    this.svc.setSeriesPathOffsets(offsets);
  }

  private getScaleOffset(scale: any, offsetPx: number): number {
    if (!scale?.invert || !scale?.domain) {
      return 0;
    }

    const [domainStart] = scale.domain();
    const startValue = domainStart instanceof Date ? domainStart.getTime() : domainStart;
    const nextValue = scale.invert(scale(domainStart) + offsetPx);
    const normalizedNextValue = nextValue instanceof Date ? nextValue.getTime() : nextValue;

    return normalizedNextValue - startValue;
  }

  protected override getClipOffset() {
    return this.seriesOffsetValue();
  }

  private getPathDragSeriesGroup(): Series<BasePoint>[] {
    const currentSeries = this.series();

    if (!currentSeries.selectedForPathDrag) {
      return [currentSeries];
    }

    const selectedSeries = this.config()?.series?.filter((series) => {
      return (
        series.selectedForPathDrag &&
        series.draggablePath &&
        series.visible !== false &&
        series.enabled !== false &&
        series.xAxisIndex === currentSeries.xAxisIndex &&
        series.yAxisIndex === currentSeries.yAxisIndex
      );
    });

    return selectedSeries?.length ? selectedSeries : [currentSeries];
  }

  private getOffsetPixels(scale: any, offsetValue: number): number {
    if (!scale || !scale?.domain || offsetValue === null || offsetValue === undefined) {
      return 0;
    }

    const [domainStart] = scale.domain();
    const startValue = domainStart instanceof Date ? domainStart.getTime() : domainStart;
    const nextValue = domainStart instanceof Date ? new Date(startValue + offsetValue) : startValue + offsetValue;

    return scale(nextValue) - scale(domainStart);
  }
}
