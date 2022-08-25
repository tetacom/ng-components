import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {IChartConfig} from '../model/i-chart-config';
import {ChartService} from '../service/chart.service';
import {
  animationFrameScheduler, combineLatest,
  combineLatestWith,
  map,
  Observable, observeOn,
  shareReplay, tap,
  withLatestFrom,
} from 'rxjs';
import {Axis} from '../core/axis/axis';
import {AxisOrientation} from '../model/enum/axis-orientation';
import {ScaleService} from '../service/scale.service';
import {ZoomService} from '../service/zoom.service';
import {BrushType} from '../model/enum/brush-type';
import {ZoomType} from '../model/enum/zoom-type';
import {tetaZoneFull} from '@tetacom/ng-components';
import {IScalesMap} from '../model/i-scales-map';
import {Series} from "../model/series";
import {BasePoint} from "../model/base-point";

type Opposite = boolean;

@Component({
  selector: 'teta-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartContainerComponent implements OnInit, OnDestroy {
  config: Observable<IChartConfig>;
  scales: Observable<IScalesMap>;
  size: Observable<DOMRect>;
  visibleRect: Observable<any>;
  brushScale: Observable<any>;
  zoomType = ZoomType;

  private _observer: ResizeObserver;
  private filterPositionMap = new Map<Opposite,
    (axis: Axis) => (_: Axis) => boolean>()
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
    private _elementRef: ElementRef,
    private _zone: NgZone
  ) {
    this.config = this._svc.config;
    this.size = this._svc.size;

    this.scales = this._scaleService.scales.pipe(
      observeOn(animationFrameScheduler),
      tetaZoneFull(this._zone),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );

    this.brushScale = this._scaleService.scales.pipe(
      withLatestFrom(this.config),
      map((data: [IScalesMap, IChartConfig]) => {
        const [{x, y}, config] = data;

        return config.brush?.type === BrushType.x || config?.zoom?.type === ZoomType.x ? x.get(0)?.scale : y.get(0)?.scale;
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );


    this.visibleRect = combineLatest([this.size, this.scales])
      .pipe(
        withLatestFrom(this.config),
        map(
          (
            data: [[DOMRect, IScalesMap], IChartConfig]
          ) => {
            const [[size, {x, y}], config] = data;
            const yAxesArray = Array.from(y.values());
            const xAxesArray = Array.from(x.values());
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
        tetaZoneFull(this._zone),
        shareReplay({
          bufferSize: 1,
          refCount: true,
        })
      );
  }

  ngOnInit() {
  }


  ngAfterViewInit(): void {
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
    return this.scales.pipe(
      withLatestFrom(this.config),
      map((data: [IScalesMap, IChartConfig]) => {
        const [{x, y}, config] = data;
        const xAxesArray = Array.from(x.values());
        const yAxesArray = Array.from(y.values());

        const oppositeFilter = this.filterPositionMap.get(true);
        const nonOppositeFilter = this.filterPositionMap.get(false);

        const oppositeOffsetY = yAxesArray.filter(oppositeFilter(axis));
        const nonOppositeOffsetY = yAxesArray.filter(nonOppositeFilter(axis));

        const oppositeOffsetX = xAxesArray.filter(oppositeFilter(axis));
        const nonOppositeOffsetX = xAxesArray.filter(nonOppositeFilter(axis));

        const oppositeTranslateY = oppositeOffsetY.reduce(
          (acc, curr) => acc + curr.selfSize,
          config.bounds?.right
        );
        const nonOppisteTranslateY = nonOppositeOffsetY.reduce(
          (acc, curr) => acc + curr.selfSize,
          config.bounds?.left
        );

        const oppositeTranslateX = oppositeOffsetX.reduce(
          (acc, curr) => acc + curr.selfSize,
          config.bounds?.top
        );

        const nonOppisteTranslateX = nonOppositeOffsetX.reduce(
          (acc, curr) => acc + curr.selfSize,
          config.bounds?.bottom
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
    xScales: Map<number, Axis>,
    yScales: Map<number, Axis>
  ) {
    const x = xScales.get(0)?.scale;
    const y = yScales.get(0)?.scale;
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
    xScales: Map<number, Axis>,
    yScales: Map<number, Axis>
  ) {
    const x = xScales.get(0)?.scale;
    const y = yScales.get(0)?.scale;
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

  trackSerie(index, item: Series<BasePoint>) {
    return item.name?.length ? item.name : index
  }
}
