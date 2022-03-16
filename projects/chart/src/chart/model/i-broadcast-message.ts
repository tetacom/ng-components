import {D3BrushEvent, D3ZoomEvent} from 'd3';
import {Axis} from '../core/axis/axis';
import {BrushType} from './enum/brush-type';
import {IChartConfig} from "./i-chart-config";

export class ZoomMessage {
  event: D3ZoomEvent<any, any>;
  axis?: Axis;
  brushDomain?: number[];

  constructor(options?: {
    event: D3ZoomEvent<any, any>;
    axis?: Axis;
    brushDomain?: number[]
  }) {
    this.event = options?.event;
    this.axis = options?.axis;
    this.brushDomain = options.brushDomain;
  }
}

export class BrushMessage {
  event: D3BrushEvent<any>;
  brushType: BrushType;
  selection: number[];
  brushScale?: any;
  hasLimit: boolean;


  constructor(options?: {
    event: D3BrushEvent<any>;
    brushType: BrushType;
    selection: number[];
    brushScale?: any;
    hasLimit?: boolean;
  }) {
    this.event = options?.event;
    this.brushType = options?.brushType;
    this.selection = options?.selection;
    this.brushScale = options?.brushScale;
    this.hasLimit = options?.hasLimit;
  }
}

export interface IBroadcastMessage<T> {
  channel: string;
  message: T;
}
