import { PlotLine } from './plot-line';
import { PlotBand } from './plot-band';
import { ScaleType } from './enum/scale-type';

export class AxisOptions {
  title: string;
  min: number;
  max: number;
  visible: boolean;
  tickFormat: (d: any) => string;
  transform: string;
  type: 'time' | 'number' | 'category';
  zoom?: boolean;
  scaleOptions: {
    type?: ScaleType;
    base?: number;
  };
  inverted?: boolean;
  negative?: boolean;
  opposite?: boolean;
  niceTicks = true;
  plotLines: PlotLine[];
  plotBands: PlotBand[];

  constructor(options?: {
    title?: string;
    min?: number;
    max?: number;
    visible?: boolean;
    tickFormat?: (d: any) => string;
    transform?: string;
    type?: 'time' | 'number' | 'category';
    zoom?: boolean;
    scaleOptions?: {
      type?: ScaleType;
      base?: number;
    };
    inverted?: boolean;
    negative?: boolean;
    opposite?: boolean;
    niceTicks?: boolean;
    plotLines?: PlotLine[];
    plotBands?: PlotBand[];
  }) {
    this.title = options?.title;
    this.min = options?.min;
    this.max = options?.max;
    this.visible = options?.visible ?? true;
    this.tickFormat = options?.tickFormat;
    this.transform = options?.transform;
    this.zoom = options?.zoom;
    this.type = options?.type ?? 'number';
    this.scaleOptions = {
      type: ScaleType.linear,
      base: 10,
      ...options?.scaleOptions,
    };
    this.inverted = options?.inverted;
    this.negative = options?.negative;
    this.opposite = options?.opposite;
    this.niceTicks = options?.niceTicks == null ? true : options.niceTicks;
    this.plotLines = options?.plotLines || [];
    this.plotBands = options?.plotBands || [];
  }
}
