import { SvgAttributes } from './svg-attributes';

export class Plotband {
  id: any;
  from: number;
  to: number;
  label?: string;
  showGrabbers?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  min?: number;
  max?: number;
  style?: {
    plotband?: SvgAttributes;
    grabbers?: SvgAttributes;
  };

  constructor(options?: {
    id: any;
    from: number;
    to: number;
    label?: string;
    showGrabbers?: boolean;
    draggable?: boolean;
    resizable?: boolean;
    min?: number;
    max?: number;
    style?: {
      plotband?: SvgAttributes;
      grabbers?: SvgAttributes;
    };
  }) {
    this.id = options?.id;
    this.from = options?.from;
    this.to = options?.to;
    this.label = options?.label;
    this.showGrabbers =
      options?.showGrabbers != null ? options.showGrabbers : true;
    this.draggable = options?.draggable != null ? options?.draggable : false;
    this.resizable = options?.resizable != null ? options?.resizable : true;
    this.min = options?.min;
    this.max = options?.max;
    this.style = options?.style;
  }
}
