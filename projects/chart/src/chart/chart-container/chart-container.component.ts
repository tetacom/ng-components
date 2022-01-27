import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {IChartConfig} from '../model/i-chart-config';
import {ChartService} from '../service/chart.service';
import {filter, map, Observable, tap} from 'rxjs';
import {throttleTime} from 'rxjs/operators';
import {Axis} from '../core/axis/axis';
import {AxisOrientation} from '../model/enum/axis-orientation';
import {ScaleService} from '../service/scale.service';

type Opposite = boolean;

@Component({
  selector: 'teta-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartContainerComponent
  implements OnInit, OnChanges, AfterViewInit {
  config: Observable<IChartConfig>;

  yAxes: Map<number, Axis>;
  xAxes: Map<number, Axis>;
  size: Observable<DOMRect>;

  private _observer: ResizeObserver;
  private uniqId: string;

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
    private _elementRef: ElementRef,
  ) {
    this.config = this._svc.config;

  }

  ngOnInit(): void {
    this.size = this._svc.size.pipe(
      filter(_ => _ !== null),
      throttleTime(100, undefined, {trailing: true}),
      map(_ => Object.assign({}, _)),
      tap(() => {
        // setTimeout(() => {
          this._cdr.detectChanges();
        // });
      })
    );

    this.yAxes = this._scaleService.yAxis;
    this.xAxes = this._scaleService.xAxis;

    this.uniqId = (Date.now() + Math.random()).toString(36);
    this._observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      this._svc.setSize(entries[0].contentRect);
    });
    this._observer.observe(this._elementRef.nativeElement);

    // this._svc.init(this.config);
  }

  ngAfterViewInit() {
  }

  private sumSize = (acc, curr) => acc + curr.selfSize;

  private oppositeFilter(axis?: Axis) {
    return (_) =>
      _.options.opposite && _.options.visible && axis.index <= _.index;
  }

  private nonOppositeFilter(axis?: Axis) {
    return (_) =>
      _.options.opposite !== true && _.options.visible && _.index <= axis.index;
  }

  getVisibleRect(size: DOMRect) {
    const yAxesArray = [...this.yAxes.values()];
    const xAxesArray = [...this.xAxes.values()];

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

    const rect = {
      left,
      top,
      width: size.width - left - right + 1,
      height: size.height - top - bottom + 1,
    };

    return rect;
  }

  getYAxisTranslate(axis: Axis, size: DOMRect): string {
    const yAxesArray = [...this.yAxes.values()];

    const translateOpposite = yAxesArray
      .filter(this.nonOppositeFilter(axis))
      .reduce(this.sumSize, 0);

    const translateNonOpposite = yAxesArray
      .filter(this.oppositeFilter(axis))
      .reduce(this.sumSize, 0);

    return `translate(${
      axis.options.opposite
        ? size.width - translateNonOpposite
        : translateOpposite
    }, 0)`;
  }

  getXAxisTranslate(axis: Axis, size: DOMRect): string {
    const xAxesArray = [...this.xAxes.values()];

    const translateNonOpposite = xAxesArray
      .filter(this.nonOppositeFilter(axis))
      .reduce(this.sumSize, 0);

    const translateOpposite = xAxesArray
      .filter(this.oppositeFilter(axis))
      .reduce(this.sumSize, 0);

    return `translate(0, ${
      axis.options.opposite
        ? translateOpposite
        : size.height - translateNonOpposite
    })`;
  }

  getTranslate(axis?: Axis, size?: DOMRect): string {
    const xAxesArray = [...this.xAxes.values()];
    const yAxesArray = [...this.yAxes.values()];

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

  ngAfterContentChecked(): void {
  }

  ngAfterViewChecked(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
