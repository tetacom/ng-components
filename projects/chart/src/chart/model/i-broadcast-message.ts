import {D3BrushEvent, D3ZoomEvent} from 'd3';
import {Axis} from '../core/axis/axis';
import {BrushType} from './enum/brush-type';


export type TransformStyle = {
  transition?: boolean;
}

export class ZoomMessage {
  event?: D3ZoomEvent<any, any> | any;
  axis?: Axis;
  domain?: number[];
  chartId: string;
  style?: TransformStyle;

  constructor(options?: {
    event: D3ZoomEvent<any, any> | any;
    axis?: Axis;
    domain?: number[]
    chartId: string;
    style?: TransformStyle;
  }) {
    this.event = options?.event;
    this.axis = options?.axis;
    this.domain = options.domain;
    this.chartId = options?.chartId;
    this.style = options?.style;
  }
}

export class BrushMessage {
  event: D3BrushEvent<any> | null;
  brushType: BrushType;
  selection: number[];
  brushScale?: any;
  style?: TransformStyle

  constructor(options?: {
    event: D3BrushEvent<any> | null;
    brushType: BrushType;
    selection: number[];
    brushScale?: any;
    style?: TransformStyle
  }) {
    this.event = options?.event;
    this.brushType = options?.brushType;
    this.selection = options?.selection;
    this.brushScale = options?.brushScale;
    this.style = options?.style;
  }
}

export interface IBroadcastMessage<T> {
  channel: string;
  message: T;
}
