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
  }

  ngOnInit(): void {
    this._observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      this._svc.setSize(entries[0].contentRect);
    });
    this._observer.observe(this._elementRef.nativeElement);

    this._svc.init(this.config);
  }

  getTranslate(axis: Axis, size: DOMRect): string {
    return `translate(${
      axis.options.opposite ? size.width - axis.offset : axis.offset
    }, 0)`;
  }

  ngAfterContentChecked(): void {}

  ngAfterViewChecked(): void {}

  ngOnChanges(changes: SimpleChanges): void {}
}
