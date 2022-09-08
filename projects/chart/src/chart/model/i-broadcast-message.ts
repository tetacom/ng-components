import {D3BrushEvent} from 'd3';
import {BrushType} from './enum/brush-type';
import {AxisOrientation} from './enum/axis-orientation';
import {ElementRef} from '@angular/core';

export type TransformStyle = {
  transition?: boolean;
}

export type TargetAxis = {
  index: number,
  orientation: AxisOrientation
}

export class ZoomMessage {
  element?: ElementRef;
  axis: TargetAxis;
  domain?: [number, number];
  chartId: string;
  style?: TransformStyle;

  constructor(options?: {
    element?: ElementRef;
    axis?: TargetAxis;
    domain?: [number, number]
    chartId: string;
    style?: TransformStyle;
  }) {
    this.element = options?.element;
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
  style?: TransformStyle;

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
