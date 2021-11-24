import {
  AfterContentChecked,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IChartConfig } from '../model/i-chart-config';
import { ChartService } from '../chart.service';
import { Observable, tap } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { AxesService } from '../axes.service';
import { Axis } from '../core/axis';

@Component({
  selector: 'teta-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartContainerComponent
  implements OnInit, OnChanges, AfterViewChecked, AfterContentChecked
{
  @Input() config: IChartConfig;

  yAxes: Map<number, Axis>;
  xAxes: Map<number, Axis>;
  size: Observable<DOMRect>;

  private _observer: ResizeObserver;

  constructor(
    private _svc: ChartService,
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _axesService: AxesService
  ) {
    this.size = this._svc.size.pipe(
      throttleTime(100, undefined, { trailing: true }),
      tap(() => {
        setTimeout(() => {
          this._cdr.detectChanges();
        });
      })
    );

    this.yAxes = this._axesService.yAxis;
    this.xAxes = this._axesService.xAxis;
  }

  ngOnInit(): void {
    this._observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      this._svc.setSize(entries[0].contentRect);
    });
    this._observer.observe(this._elementRef.nativeElement);

    this._svc.init(this.config);
  }

  getYAxisTranslate(axis: Axis, size: DOMRect): string {
    const nonOppositeList = [...this.yAxes.values()].filter(
      (_) =>
        _.options.opposite !== true &&
        _.options.visible &&
        axis.index <= _.index
    );

    const oppositeList = [...this.yAxes.values()].filter(
      (_) => _.options.opposite && _.options.visible && axis.index <= _.index
    );

    const nonOppositeTranslate = nonOppositeList.reduce(
      (prev, curr) => prev + curr.selfSize,
      0
    );

    const oppositeTranslate = oppositeList.reduce(
      (prev, curr) => prev + curr.selfSize,
      0
    );

    return `translate(${
      axis.options.opposite
        ? size.width - oppositeTranslate
        : nonOppositeTranslate
    }, 0)`;
  }

  getXAxisTranslate(axis: Axis, size: DOMRect): string {
    const left = [...this.yAxes.values()].filter(
      (_) => _.options.opposite !== true && _.options.visible
    );
    const translateLeft = left.reduce((prev, curr) => prev + curr.selfSize, 0);
    return `translate(0, ${
      axis.options.opposite ? axis.offset : size.height - axis.offset
    })`;
  }

  ngAfterContentChecked(): void {}

  ngAfterViewChecked(): void {}

  ngOnChanges(changes: SimpleChanges): void {}
}
