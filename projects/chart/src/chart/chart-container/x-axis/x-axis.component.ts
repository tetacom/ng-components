import {
  ChangeDetectionStrategy,
  Component,
  Input, OnChanges, OnDestroy,
  OnInit, SimpleChange, SimpleChanges,
} from '@angular/core';
import {Axis} from '../../core/axis/axis';
import {BehaviorSubject, combineLatest, map, Observable, Subject, withLatestFrom} from 'rxjs';
import {ScaleService} from '../../service/scale.service';
import {getTextWidth} from '../../core/utils/get-text-width';
import * as d3 from 'd3';
import {ChartService} from '../../service/chart.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: '[teta-x-axis]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
  ]
})
export class XAxisComponent implements OnInit, OnChanges, OnDestroy {
  x: Observable<any>;
  ticks: Observable<any[]>;

  @Input() axis: Axis;
  @Input() size: DOMRect;

  private update$ = new BehaviorSubject<void>(null);
  private _alive = true;

  constructor(private scaleService: ScaleService, private _svc: ChartService) {
    this.x = this.scaleService.scales.pipe(map((_) => {
      return _.x.get(this.axis.index)?.scale;
    }));


    this.ticks = combineLatest([this.x, this.update$]).pipe(
      withLatestFrom(this._svc.size),
      map((_: [[any, void], DOMRect]) => {
        const [[x], size] = _;

        const tickSize = x.ticks().map((_) => getTextWidth(this.axis.options.tickFormat ? this.axis.options.tickFormat(_) : this.axis.defaultFormatter()(_), 0.45, 11));
        return x.ticks(size.width / parseInt(d3.max(tickSize), 10) / 5);
      })
    );
  }

  getLabelTransform() {
    return `translate(${
      this.size.width / 2
    }, ${this.axis.options.opposite ? -32 : 32})`;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('axis')) {
      this.update$.next();
    }
  }

}
