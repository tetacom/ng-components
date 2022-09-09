import {Injectable} from '@angular/core';
import {IChartConfig} from '../model/i-chart-config';
import {
  BehaviorSubject,
  filter,
  lastValueFrom,
  map,
  Observable,
  of,
  shareReplay,
  Subject,
  take, takeLast, tap,
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
import {ClipPointsDirection} from "../model/enum/clip-points-direction";
import {ZoomService} from "./zoom.service";
import {BrushService} from './brush.service';

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
  // public zoomInstance: Observable<ZoomService>;
  // public brushInstance: Observable<BrushService>;

  private config$ = new BehaviorSubject<IChartConfig>(defaultChartConfig());
  private size$ = new BehaviorSubject<DOMRect>(null);
  private pointerMove$ = new Subject<PointerEvent>();
  private tooltips$ = new BehaviorSubject<Map<Series<BasePoint>, IDisplayTooltip>>(new Map());
  private plotBandEvent$ = new Subject<IChartEvent<PlotBand>>();
  private plotLineMove$ = new Subject<IChartEvent<PlotLine>>();
  private pointMove$ = new Subject<IChartEvent<IPointMove>>();
  private chartClick$ = new Subject<IChartEvent<BasePoint>>();
  private chartContextMenu$ = new Subject<IChartEvent<BasePoint>>();
  private annotationEvent$ = new Subject<IChartEvent<Annotation>>();
  private annotationMove$ = new Subject<IChartEvent<Annotation>>();
  // private zoomInstance$ = new Subject<ZoomService>();
  // private brushInstance$ = new Subject<BrushService>();


  private static _hiddenSeriesPostfix = 'hidden_series';

  constructor() {
    this.id = of((Date.now() + Math.random()).toString(36));

    this.config = this.config$.asObservable().pipe(
      withLatestFrom(this.id),
      map(this.setDefaults),
      map(this.setPreparationData),
      map(this.restoreLocalStorage),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );


    this.size = this.size$.asObservable().pipe(filter((size) => size != null));
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
    // this.zoomInstance = this.zoomInstance$.asObservable();
    // this.brushInstance = this.brushInstance$.asObservable();
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

  public async toggleVisibilitySeries(seriesIndex: Array<number | string>, visible?: boolean) {

    if (seriesIndex?.length === 0) {
      return;
    }

    const currentConfig = await lastValueFrom(this.config.pipe(take(1)));

    seriesIndex.forEach((serieIndex) => {
      const currentSerieIndex = currentConfig.series.findIndex((_) => _.id === serieIndex);

      if (currentSerieIndex === -1) {
        return;
      }
      currentConfig.series[currentSerieIndex].visible = visible !== undefined ? visible : !currentConfig.series[currentSerieIndex].visible;

      const seriesLinkCount = currentConfig.series.filter((_) => _.yAxisIndex === currentConfig.series[currentSerieIndex].yAxisIndex && _.visible === true).length
      currentConfig.yAxis[currentConfig.series[currentSerieIndex].yAxisIndex].visible = seriesLinkCount !== 0;
    })

    try {
      this.saveCookie(currentConfig);
    } finally {
      this.config$.next(currentConfig);
    }
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

  // public emitZoomInstance(event: ZoomService) {
  //   this.zoomInstance$.next(event);
  // }
  //
  // public emitZoomInstance(event: ZoomService) {
  //   this.zoomInstance$.next(event);
  // }

  private saveCookie(config: IChartConfig) {
    if(!config.name) return;
    const hiddenSeries = config.series?.filter((_) => !_.visible).map((_) => _.id);
    localStorage.setItem(`${config.name}_${ChartService._hiddenSeriesPostfix}`, JSON.stringify(hiddenSeries))
  }

  private restoreLocalStorage(config: IChartConfig): IChartConfig {
    if(!config.name) return config;

    const hiddenSeries = localStorage.getItem(`${config.name}_${ChartService._hiddenSeriesPostfix}`);
    if (hiddenSeries) {
      const json = JSON.parse(hiddenSeries) as Array<string | number>;
      config.series = config.series.map((serie, index) => {
        serie.visible = !json.includes(serie.id);

        const currentSerieIndex = config.series.findIndex((_) => _.id === serie.id);

        if (currentSerieIndex !== -1) {
          const seriesLinkCount = config.series.filter((_) => _.yAxisIndex === config.series[currentSerieIndex].yAxisIndex && _.visible === true).length
          config.yAxis[config.series[currentSerieIndex].yAxisIndex].visible = seriesLinkCount !== 0;
        }


        return serie;
      });


      return config
    }

    return config
  }

  private setDefaults(data: [IChartConfig, string]): IChartConfig {

    let [config, id] = data;

    const defaultConfig = (defaultConfig) => {
      return (source) => {
        return Object.assign({}, defaultConfig, source);
      };
    };

    config = Object.assign({}, defaultChartConfig(), config);
    config.id = config.id ?? id;

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
          clipPointsDirection: ClipPointsDirection.y,
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
