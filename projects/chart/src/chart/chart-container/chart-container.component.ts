import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IChartConfig } from '../model/i-chart-config';
import { ChartService } from '../service/chart.service';
import {
  animationFrameScheduler,
  combineLatest,
  map,
  Observable,
  shareReplay,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Axis } from '../core/axis/axis';
import { AxisOrientation } from '../model/enum/axis-orientation';
import { ScaleService } from '../service/scale.service';
import { ZoomService } from '../service/zoom.service';
import { BrushType } from '../model/enum/brush-type';
import { throttleTime } from 'rxjs/operators';

type Opposite = boolean;

@Component({
  selector: 'teta-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartContainerComponent implements OnInit, OnDestroy {
  config: Observable<IChartConfig>;

  yAxisMap: Observable<Map<number, Axis>>;
  xAxisMap: Observable<Map<number, Axis>>;
  yScaleMap: Observable<Map<number, any>>;
  xScaleMap: Observable<Map<number, any>>;
  size: Observable<DOMRect>;
  visibleRect: Observable<any>;

  brushScale: Observable<any>;

  private _observer: ResizeObserver;

  private filterPositionMap = new Map<
    Opposite,
    (axis: Axis) => (_: Axis) => boolean
  >()
    .set(
      true,
      (axis) => (_: Axis) =>
        _.options.opposite && _.options.visible && axis.index <= _.index
    )
    .set(
      false,
      (axis) => (_: Axis) =>
        _.options.opposite !== true &&
        _.options.visible &&
        _.index <= axis.index
    );

  constructor(
    private _svc: ChartService,
    private _cdr: ChangeDetectorRef,
    private _scaleService: ScaleService,
    private _zoomService: ZoomService,
    private _elementRef: ElementRef
  ) {
    this.config = this._svc.config;
    this.size = this._svc.size;
    this.yAxisMap = this._scaleService.yAxisMap;
    this.xAxisMap = this._scaleService.xAxisMap;

    this.yScaleMap = this._scaleService.yScaleMap.pipe(
      throttleTime(0, animationFrameScheduler, { trailing: true }),
      tap(() => this._cdr.detectChanges()),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );

    this.xScaleMap = this._scaleService.xScaleMap.pipe(
      throttleTime(0, animationFrameScheduler, { trailing: true }),
      tap(() => this._cdr.detectChanges()),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );

    this.brushScale = combineLatest([
      this._scaleService.xScaleMap,
      this._scaleService.yScaleMap,
    ]).pipe(
      withLatestFrom(this.config),
      map((data: [[Map<number, any>, Map<number, any>], IChartConfig]) => {
        const [[x, y], config] = data;

        return config.brush?.type === BrushType.x ? x.get(0) : y.get(0);
      }),

      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );

    this.visibleRect = combineLatest([
      this.size,
      this.xAxisMap,
      this.yAxisMap,
    ]).pipe(
      throttleTime(0, animationFrameScheduler, { trailing: true }),
      withLatestFrom(this.config),
      map(
        (
          data: [[DOMRect, Map<number, any>, Map<number, any>], IChartConfig]
        ) => {
          const [[size, x, y], config] = data;
          const yAxesArray = [...y.values()];
          const xAxesArray = [...x.values()];
          const left = yAxesArray
            .filter((_) => _.options.opposite !== true && _.options.visible)
            .reduce(this.sumSize, 0);

          const right = yAxesArray
            .filter((_) => _.options.opposite && _.options.visible)
            .reduce(this.sumSize, 0);

          const bottom = xAxesArray
            .filter((_) => _.options.opposite !== true && _.options.visible)
            .reduce(this.sumSize, 0);

          const top = xAxesArray
            .filter((_) => _.options.opposite && _.options.visible)
            .reduce(this.sumSize, 0);
          return {
            x: left + config.bounds?.left,
            y: top + config.bounds?.top,
            width:
              size.width -
              left -
              right -
              config.bounds?.left -
              config.bounds?.right,
            height:
              size.height -
              top -
              bottom -
              config.bounds?.top -
              config.bounds?.bottom,
          };
        }
      ),
      tap(() => setTimeout(() => this._cdr.detectChanges()))
    );
  }

  ngOnInit(): void {
    this._observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      requestAnimationFrame(() => {
        if (
          !Array.isArray(entries) ||
          !entries.length ||
          entries[0].contentRect.width <= 0 ||
          entries[0].contentRect.height <= 0
        ) {
          return;
        }
        this._svc.setSize(entries[0].contentRect);
      });
    });
    this._observer.observe(this._elementRef.nativeElement);
  }

  ngOnDestroy() {
    this._observer.disconnect();
  }

  private sumSize = (acc, curr) => acc + curr.selfSize;

  getTranslate(axis?: Axis, size?: DOMRect): Observable<string> {
    return combineLatest([this.xAxisMap, this.yAxisMap]).pipe(
      withLatestFrom(this.config),
      map((data: [[Map<number, Axis>, Map<number, Axis>], IChartConfig]) => {
        const [[x, y], config] = data;
        const xAxesArray = [...x.values()];
        const yAxesArray = [...y.values()];

        const oppositeFilter = this.filterPositionMap.get(true);
        const nonOppositeFilter = this.filterPositionMap.get(false);

        const oppositeOffsetY = yAxesArray.filter(oppositeFilter(axis));
        const nonOppositeOffsetY = yAxesArray.filter(nonOppositeFilter(axis));

        const oppositeOffsetX = xAxesArray.filter(oppositeFilter(axis));
        const nonOppositeOffsetX = xAxesArray.filter(nonOppositeFilter(axis));

        const oppositeTranslateY = oppositeOffsetY.reduce(
          (acc, curr) => acc + curr.selfSize,
          0
        );
        const nonOppisteTranslateY = nonOppositeOffsetY.reduce(
          (acc, curr) => acc + curr.selfSize,
          0
        );

        const oppositeTranslateX = oppositeOffsetX.reduce(
          (acc, curr) => acc + curr.selfSize,
          0
        );

        const nonOppisteTranslateX = nonOppositeOffsetX.reduce(
          (acc, curr) => acc + curr.selfSize,
          0
        );

        const left = yAxesArray
          .filter((_) => _.options.visible && _.options.opposite !== true)
          .reduce((acc, curr) => acc + curr.selfSize, config.bounds?.left);

        const top = xAxesArray
          .filter((_) => _.options.visible && _.options.opposite === true)
          .reduce((acc, curr) => acc + curr.selfSize, config.bounds?.top);

        if (axis.orientation === AxisOrientation.x) {
          return `translate(${left}, ${
            axis.options.opposite
              ? oppositeTranslateX
              : size.height - nonOppisteTranslateX
          })`;
        }

        if (axis.orientation === AxisOrientation.y) {
          return `translate(${
            axis.options.opposite
              ? size.width - oppositeTranslateY
              : nonOppisteTranslateY
          }, ${top})`;
        }

        return 'translate(0, 0)';
      })
    );
  }

  identify(index, item) {
    return item.value.index;
  }

  click(
    event: PointerEvent,
    xScales: Map<number, any>,
    yScales: Map<number, any>
  ) {
    const x = xScales.get(0);
    const y = yScales.get(0);
    this._svc.emitChartClick({
      event: event,
      target: {
        x: x.invert(event.offsetX),
        y: y.invert(event.offsetY),
      },
    });
  }

  contextMenu(
    event: MouseEvent,
    xScales: Map<number, any>,
    yScales: Map<number, any>
  ) {
    const x = xScales.get(0);
    const y = yScales.get(0);
    this._svc.emitChartContextMenu({
      event: event,
      target: {
        x: x.invert(event.offsetX),
        y: y.invert(event.offsetY),
      },
    });
  }

  mouseMove(event) {
    this._svc.setPointerMove(event);
  }

  mouseLeave(event) {
    this._svc.setPointerMove(event);
  }
}
