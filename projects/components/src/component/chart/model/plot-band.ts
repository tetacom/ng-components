export class PlotBand {
  id: any;
  from: number;
  to: number;
  label?: string;
  color?: string;
  showGrabbers?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  min?: number;
  max?: number;
  opacity?: number;

  constructor(options?: {
    id: any;
    from: number;
    to: number;
    label?: string;
    color?: string;
    showGrabbers?: boolean;
    draggable?: boolean;
    resizable?: boolean;
    min?: number;
    max?: number;
    opacity?: number;
  }) {
    this.id = options?.id;
    this.from = options?.from;
    this.to = options?.to;
    this.label = options?.label;
    this.color = options?.color || '#59AE501A';
    this.showGrabbers =
      options?.showGrabbers != null ? options.showGrabbers : true;
    this.draggable = options?.draggable != null ? options?.draggable : false;
    this.resizable = options?.resizable != null ? options?.resizable : true;
    this.min = options?.min;
    this.max = options?.max;
    this.opacity = options?.opacity;
  }
}
