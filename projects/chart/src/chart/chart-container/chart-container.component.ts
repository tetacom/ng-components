import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { IChartConfig } from '../model/i-chart-config';
import { ChartService } from '../service/chart.service';
import {
  combineLatest,
  map,
  Observable,
  share,
  shareReplay,
  startWith,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Axis } from '../core/axis/axis';
import { AxisOrientation } from '../model/enum/axis-orientation';
import { ScaleService } from '../service/scale.service';
import { IChartEvent } from '../model/i-chart-event';
import { ZoomService } from '../service/zoom.service';
import { BrushType } from '../model/enum/brush-type';

type Opposite = boolean;

@Component({
  selector: 'teta-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartContainerComponent implements OnInit {
  config: Observable<IChartConfig>;

  yAxisMap: Observable<Map<number, Axis>>;
  xAxisMap: Observable<Map<number, Axis>>;
  yScaleMap: Observable<Map<number, any>>;
  xScaleMap: Observable<Map<number, any>>;
  size: Observable<DOMRect>;
  visibleRect: Observable<any>;

  brushScale: Observable<any>;

  private _observer: ResizeObserver;
  private uniqId: string;

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
    this.yScaleMap = this._scaleService.yScaleMap;
    this.xScaleMap = this._scaleService.xScaleMap;

    this.brushScale = combineLatest([
      this._scaleService.xScaleMap,
      this._scaleService.yScaleMap,
    ]).pipe(
      withLatestFrom(this.config),
      map((data: [[Map<number, any>, Map<number, any>], IChartConfig]) => {
        const [[x, y], config] = data;

        return config.brush?.type === BrushType.x
          ? x.get(0).copy()
          : y.get(0).copy();
      }),
      shareReplay(1)
    );

    this.visibleRect = combineLatest([
      this.size,
      this.xAxisMap,
      this.yAxisMap,
      this._zoomService.zoomed,
    ]).pipe(
      map(
        (
          data: [DOMRect, Map<number, any>, Map<number, any>, IChartEvent<Axis>]
        ) => {
          const [size, x, y] = data;
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
            x: left,
            y: top,
            width: size.width - left - right,
            height: size.height - top - bottom,
          };
        }
      ),
      tap((_) => {
        this._cdr.detectChanges();
      })
    );
  }

  ngOnInit(): void {
    this.uniqId = (Date.now() + Math.random()).toString(36);
    this._observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
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
    this._observer.observe(this._elementRef.nativeElement);
  }

  ngAfterViewInit() {}

  private sumSize = (acc, curr) => acc + curr.selfSize;

  getTranslate(axis?: Axis, size?: DOMRect): Observable<string> {
    return combineLatest([this.xAxisMap, this.yAxisMap]).pipe(
      map((data: [Map<number, Axis>, Map<number, Axis>]) => {
        const [x, y] = data;
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
          .reduce((acc, curr) => acc + curr.selfSize, 0);

        const top = xAxesArray
          .filter((_) => _.options.visible && _.options.opposite === true)
          .reduce((acc, curr) => acc + curr.selfSize, 0);

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

  mouseMove(event) {
    this._svc.setPointerMove(event);
  }

  mouseLeave(event) {
    this._svc.setPointerMove(event);
  }

  id(): string {
    return this.uniqId;
  }
}
