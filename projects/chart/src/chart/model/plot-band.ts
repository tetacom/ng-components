import { SvgAttributes } from './svg-attributes';

export class PlotBand {
  id?: number | string;
  name?: string;
  from: number;
  to: number;
  label?: string;
  showGrabbers?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  min?: number;
  max?: number;
  order = 0;
  style?: {
    plotBand?: SvgAttributes;
    grabbers?: SvgAttributes;
  };

  constructor(options?: {
    id?: number | string;
    name?: string;
    from: number;
    to: number;
    label?: string;
    showGrabbers?: boolean;
    draggable?: boolean;
    resizable?: boolean;
    min?: number;
    max?: number;
    order?: number;
    style?: {
      plotBand?: SvgAttributes;
      grabbers?: SvgAttributes;
    };
  }) {
    this.id = options?.id;
    this.name = options?.name;
    this.from = options?.from;
    this.to = options?.to;
    this.label = options?.label;
    this.showGrabbers = options?.showGrabbers != null ? options.showGrabbers : true;
    this.draggable = options?.draggable != null ? options?.draggable : false;
    this.resizable = options?.resizable != null ? options?.resizable : true;
    this.min = options?.min;
    this.max = options?.max;
    this.order = options?.order ?? 0;
    this.style = options?.style;
  }
}
