import { SvgAttributes } from './svg-attributes';

export class PlotLine {
  id?: number | string;
  name?: string;
  value: number;
  label?: string;
  min?: number;
  max?: number;
  draggable?: boolean;
  style?: SvgAttributes;

  constructor(options?: {
    id?: number | string;
    name?: string;
    value: number;
    label?: string;
    min?: number;
    max?: number;
    draggable?: boolean;
    style?: SvgAttributes;
  }) {
    this.id = options?.id;
    this.name = options?.name;
    this.value = options?.value;
    this.label = options?.label;
    this.min = options?.min;
    this.max = options?.max;
    this.draggable = options?.draggable;
    this.style = options?.style;
  }
}
