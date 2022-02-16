import { D3BrushEvent, D3ZoomEvent } from 'd3';
import { Axis } from '../core/axis/axis';
import { BrushType } from './enum/brush-type';

export interface ZoomMessage {
  event: D3ZoomEvent<any, any>;
  axis?: Axis;
  brushDomain?: number[];
}

export interface BrushMessage {
  event: D3BrushEvent<any>;
  brushType: BrushType;
  selection: number[];
  brushScale?: any;
}

export interface IBroadcastMessage {
  channel: string;
  message: ZoomMessage | BrushMessage;
}
