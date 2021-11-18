import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import {IChartConfig} from '../model/i-chart-config';
import {ChartService} from '../chart.service';
import {Observable, Subject, tap} from 'rxjs';
import {throttleTime} from 'rxjs/operators';

@Component({
  selector: 'teta-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartContainerComponent implements OnInit {
  @Input() config: IChartConfig;

  size: Observable<DOMRect>;

  private _observer: ResizeObserver;
  private _size = new Subject<DOMRect>();

  constructor(private _svc: ChartService,
              private _cdr: ChangeDetectorRef,
              private _elementRef: ElementRef) {
    this.size = this._size.asObservable().pipe(
      throttleTime(100, undefined, {trailing: true}),
      tap(() => {
        setTimeout(() => this._cdr.detectChanges());
      }));
  }

  ngOnInit(): void {
    this._observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      this._size.next(entries[0].contentRect);
    });
    this._observer.observe(this._elementRef.nativeElement);
  }
}
