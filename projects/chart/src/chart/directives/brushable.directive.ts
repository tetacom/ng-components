import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input, NgZone, OnChanges, OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {IChartConfig} from '../model/i-chart-config';
import {BrushService} from '../service/brush.service';
import {ChartService} from '../service/chart.service';
import {Axis} from '../core/axis/axis';
import {BrushType} from '../model/enum/brush-type';
import * as d3 from 'd3';
import {BrushMessage} from '../model/i-broadcast-message';
import {filter, takeWhile} from 'rxjs';

@Directive({
  selector: '[tetaBrushable]',
})
export class BrushableDirective implements OnDestroy, OnInit, AfterViewInit, OnChanges {
  @Input() config: IChartConfig;
  @Input() axis: Axis;

  private selection: number[];
  private brush: d3.BrushBehavior<any>;
  private brushMap = new Map<BrushType, d3.BrushBehavior<any>>()
    .set(BrushType.x, d3.brushX())
    .set(BrushType.y, d3.brushY());
  private _alive = true;
  private _container;

  constructor(
    private brushService: BrushService,
    private chartService: ChartService,
    private element: ElementRef,
    private zone: NgZone
  ) {
    this._container = d3.select(this.element.nativeElement);
  }

  ngOnInit() {
    this.brushService.brushDomain.pipe(
      takeWhile(() => this._alive),
      filter((brush) => brush.chartId !== this.config.id)
    ).subscribe((brush) => {
      this._container.call(
        this.brush.move,
        [
          Math.floor(brush.selection[0]),
          Math.floor(brush.selection[1]),
        ].map(this.axis.scale)
      );
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

  ngAfterViewInit() {
    if(this.config?.brush?.enable) {
      const brushMessage = new BrushMessage({
        chartId: this.config.id,
        selection: [this.config?.brush?.from, this.config?.brush?.to],
        mode: 'init'
      });
      this.brushService.setBrush(brushMessage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('config')) {
      this.clearPreviousSelection();
    }

    if (this.config?.brush?.enable) {
      this.applyBrush(
        this.config,
        this.axis.scale
      );
    }
  }

  applyBrush(config: IChartConfig, brushScale: any) {
    this.brush?.on('start brush end', null);
    if (config.brush?.enable) {
      this.brush = this.brushMap.get(config?.brush?.type ?? BrushType.x);
      this.brush.on('start brush end', (_: d3.D3BrushEvent<any>) => {
        if (_.sourceEvent) {
          if (!_.selection) return;
          const [from, to] = _.selection as number[];
          if (to - from === 0) {
            const selection: number[] =
              this.selection?.map(brushScale) ??
              [config.brush?.from, config.brush?.to].map(brushScale);
            const halfBrushHeight = (selection[1] - selection[0]) / 2;
            const invertedSelection: number[] = [
              from - halfBrushHeight,
              to + halfBrushHeight,
            ].map(brushScale.invert);

            if (
              invertedSelection[1] - invertedSelection[0] >
              config.brush?.max
            ) {
              this._container.call(
                this.brush.move,
                [
                  Math.floor(invertedSelection[0]),
                  Math.floor(invertedSelection[0] + config.brush?.max),
                ].map(brushScale)
              );
              return;
            }

            if (
              invertedSelection[1] - invertedSelection[0] <
              config.brush?.min
            ) {
              this._container.call(
                this.brush.move,
                [
                  Math.floor(invertedSelection[0]),
                  Math.ceil(invertedSelection[0] + config.brush?.min),
                ].map(brushScale)
              );
              return;
            }

            this._container.call(this.brush.move, [
              from - halfBrushHeight,
              to + halfBrushHeight,
            ]);
            return;
          }

          if (
            brushScale.invert(to) - brushScale.invert(from) >
            config.brush?.max
          ) {
            this._container.call(
              this.brush.move,
              this.selection
                ? [
                  this.selection[0],
                  this.selection[0] + config.brush?.max,
                ].map(brushScale)
                : [config.brush?.from, config.brush?.to].map(brushScale)
            );
            return;
          }

          if (
            brushScale.invert(to) - brushScale.invert(from) <
            config.brush?.min
          ) {
            this._container.call(
              this.brush.move,
              this.selection
                ? [
                  this.selection[0],
                  this.selection[0] + config.brush?.min,
                ].map(brushScale)
                : [config.brush?.from, config.brush?.to].map(brushScale)
            );
            return;
          }

          if (_.sourceEvent instanceof MouseEvent) {
            this.selection = _.selection.map(brushScale.invert);
          }

          const brushMessage = new BrushMessage({
            chartId: this.config.id,
            selection: [brushScale.invert(from), brushScale.invert(to)],
            mode: _.mode
          });
          this.brushService.setBrush(brushMessage);
        }
      });

      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this._container.call(this.brush);

          let domain = brushScale.domain();

          if (config?.brush?.from) {
            domain[0] = config.brush.from;
          }

          if (config?.brush?.to) {
            domain[1] = config.brush.to;
          }

          this._container.call(
            this.brush.move,
            this.selection
              ? this.selection.map(brushScale)
              : domain.map(brushScale),
            {}
          );
        }, 0);
      });
    }
  }

  clearPreviousSelection() {
    this.selection = null;
  }
}
