import {Injectable} from '@angular/core';
import {IChartConfig} from '../model/i-chart-config';
import {
  BehaviorSubject,
  filter, first,
  map,
  Observable,
  of,
  shareReplay,
  Subject,
  withLatestFrom,
} from 'rxjs';
import {IChartEvent} from '../model/i-chart-event';
import {IDisplayTooltip} from '../model/i-display-tooltip';
import {PlotBand} from '../model/plot-band';
import {PlotLine} from '../model/plot-line';
import {IPointMove} from '../model/i-point-move';
import {defaultChartConfig} from '../default/default-chart-config';
import {defaultAxisConfig} from '../default/default-axis-config';
import {defaultSeriesConfig} from '../default/default-series-config';
import {BasePoint} from '../model/base-point';
import {Series} from '../model/series';
import {Annotation} from '../model/annotation';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public id: Observable<string>;
  public config: Observable<IChartConfig>;
  public size: Observable<DOMRect>;
  public pointerMove: Observable<PointerEvent>;
  public tooltips: Observable<Map<Series<BasePoint>, IDisplayTooltip>>;
  public plotBandEvent: Observable<IChartEvent<PlotBand>>;
  public plotLineMove: Observable<IChartEvent<PlotLine>>;
  public plotBandClick: Observable<IChartEvent<PlotBand>>;
  public plotBandContextMenu: Observable<IChartEvent<PlotBand>>;
  public pointMove: Observable<IChartEvent<IPointMove>>;
  public annotationMove: Observable<IChartEvent<Annotation>>;
  public annotationClick: Observable<IChartEvent<Annotation>>;
  public annotationContextMenu: Observable<IChartEvent<Annotation>>;
  public chartClick: Observable<IChartEvent<BasePoint>>;
  public chartContextMenu: Observable<IChartEvent<BasePoint>>;
  private config$ = new BehaviorSubject<IChartConfig>(defaultChartConfig());
  private size$ = new BehaviorSubject<DOMRect>(new DOMRectReadOnly());
  private pointerMove$ = new Subject<PointerEvent>();
  private tooltips$ = new BehaviorSubject<Map<Series<BasePoint>, IDisplayTooltip>>(new Map());
  private plotBandEvent$ = new Subject<IChartEvent<PlotBand>>();
  private plotLineMove$ = new Subject<IChartEvent<PlotLine>>();
  private pointMove$ = new Subject<IChartEvent<IPointMove>>();
  private chartClick$ = new Subject<IChartEvent<BasePoint>>();
  private chartContextMenu$ = new Subject<IChartEvent<BasePoint>>();
  private annotationEvent$ = new Subject<IChartEvent<Annotation>>();
  private annotationMove$ = new Subject<IChartEvent<Annotation>>();

  constructor() {
    this.id = of((Date.now() + Math.random()).toString(36));

    this.config = this.config$.asObservable().pipe(
      withLatestFrom(this.id),
      map(this.setDefaults),
      map(this.setPreparationData),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );

    this.size = this.size$.asObservable();

    this.pointerMove = this.pointerMove$.asObservable();
    this.tooltips = this.tooltips$.asObservable();
    this.plotBandEvent = this.plotBandEvent$.asObservable();
    this.plotLineMove = this.plotLineMove$.asObservable();
    this.pointMove = this.pointMove$.asObservable();
    this.chartClick = this.chartClick$.asObservable();
    this.chartContextMenu = this.chartContextMenu$.asObservable();
    this.annotationClick = this.annotationEvent$
      .asObservable()
      .pipe(filter((_) => _?.event?.type === 'click'));
    this.annotationContextMenu = this.annotationEvent$
      .asObservable()
      .pipe(filter((_) => _?.event?.type === 'contextmenu'));
    this.annotationMove = this.annotationMove$.asObservable();

    this.plotBandClick = this.plotBandEvent$
      .asObservable()
      .pipe(filter((_) => _?.event?.type === 'click'));
    this.plotBandContextMenu = this.plotBandEvent$
      .asObservable()
      .pipe(filter((_) => _?.event?.type === 'contextmenu'));
  }

  public setConfig(config: IChartConfig) {
    this.clearTooltips();
    this.config$.next(config);
  }

  public setSize(size: DOMRect) {
    this.size$.next(size);
  }

  public setPointerMove(event: PointerEvent) {
    this.pointerMove$.next(event);
  }

  public setTooltip(tooltip: IDisplayTooltip) {
    const currentTooltips = this.tooltips$.value;
    if (!tooltip.point) {
      currentTooltips.delete(tooltip.series);
    } else {
      currentTooltips.set(tooltip.series, tooltip);
    }
    this.tooltips$.next(
      new Map<Series<BasePoint>, IDisplayTooltip>(currentTooltips)
    );
  }

  public clearTooltips() {
    this.tooltips$.next(new Map());
  }

  public toggleVisibilitySeries(seriesIndex: Array<number | string>, visible?: boolean) {


    if(seriesIndex?.length === 0) {
      return;
    }

    const currentConfig = this.config$.value

    seriesIndex.forEach((serieIndex) => {
      const currentSerieIndex = currentConfig.series.findIndex((_) => _.id === serieIndex);

      if(currentSerieIndex === -1) {
        return;
      }

      const serie = currentConfig.series[currentSerieIndex];
      if (!serie.hasOwnProperty('visible')) {
        currentConfig.series[currentSerieIndex].visible = true;
      }
      currentConfig.series[currentSerieIndex].visible = visible !== undefined ? visible : !currentConfig.series[currentSerieIndex].visible;
    })

    this.config$.next(currentConfig);
  }

  public emitMoveAnnotation(event: IChartEvent<Annotation>) {
    this.annotationMove$.next(event);
  }

  public emitAnnotation(event: IChartEvent<Annotation>) {
    this.annotationEvent$.next(event);
  }

  public emitPlotband(event: IChartEvent<PlotBand>) {
    this.plotBandEvent$.next(event);
  }

  public emitPlotline(event: IChartEvent<PlotLine>) {
    this.plotLineMove$.next(event);
  }

  public emitPoint(event: IChartEvent<IPointMove>) {
    this.pointMove$.next(event);
  }

  public emitChartClick(event: IChartEvent<BasePoint>) {
    this.chartClick$.next(event);
  }

  public emitChartContextMenu(event: IChartEvent<BasePoint>) {
    this.chartContextMenu$.next(event);
  }

  private setDefaults(data: [IChartConfig, string]): IChartConfig {
    let [config, id] = data;

    const defaultConfig = (defaultConfig) => {
      return (source) => {
        return Object.assign({}, defaultConfig, source);
      };
    };

    config = Object.assign({}, defaultChartConfig(), config);
    config.id = id;

    config.xAxis = config.xAxis.map(defaultConfig(defaultAxisConfig));
    config.yAxis = config.yAxis.map(defaultConfig(defaultAxisConfig));
    config.series = config.series.map(defaultConfig(defaultSeriesConfig()));

    config.series = config.series.map((_, index) => {
      return {
        ..._,
        data: _.data ?? [],
        id: _.id ?? index,
      };
    });

    config.yAxis = config.yAxis.map((axis, idx) => {
      const seriesLinkCount = config.series.filter((_) => _.yAxisIndex === idx && _.visible).length
      return Object.assign({}, axis, {visible: seriesLinkCount !== 0})
    })

    const oppositeYCount = config.yAxis?.filter((_) => _.opposite);
    const oppositeXCount = config.xAxis?.filter((_) => _.opposite);

    const nonOppositeYCount = config.yAxis?.filter((_) => !_.opposite);
    const nonOppositeXCount = config.xAxis?.filter((_) => !_.opposite);

    if (nonOppositeXCount?.length > 1) {
      config.bounds.bottom = 0;
    }

    if (oppositeXCount?.length > 1) {
      config.bounds.top = 0;
    }

    if (nonOppositeYCount?.length > 1) {
      config.bounds.left = 0;
    }

    if (oppositeYCount?.length > 1) {
      config.bounds.right = 0;
    }

    config.tooltip = Object.assign(
      {},
      defaultChartConfig().tooltip,
      config.tooltip
    );

    config.zoom = Object.assign(
      {},
      defaultChartConfig().zoom,
      config.zoom
    );

    config.zoom.syncChannel = config.zoom?.syncChannel ?? id;

    return config;
  }

  private setPreparationData(config: IChartConfig): IChartConfig {
    if (config.inverted) {
      const xAxes = [...config.xAxis];
      const yAxes = [...config.yAxis];

      config.xAxis = yAxes;
      config.yAxis = xAxes;

      config.series = config.series?.map((serie) => {
        const x = serie.xAxisIndex;
        const y = serie.yAxisIndex;
        serie.xAxisIndex = y;
        serie.yAxisIndex = x;
        return {
          ...serie,
          data: serie?.data?.map((point) => {
            return {
              ...point,
              x: point?.y,
              y: point?.x,
              x1: point?.y1,
              y1: point?.x1,
            };
          }),
        };
      });
    }

    if (config?.brush?.enable) {
      config.yAxis = config.yAxis.map((_) => ({..._, zoom: false}));
      config.xAxis = config.xAxis.map((_) => ({..._, zoom: false}));
    }

    return config;
  }
}
