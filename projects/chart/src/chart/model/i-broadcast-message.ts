import { AxisOrientation } from './enum/axis-orientation';
import { ElementRef } from '@angular/core';

export type TransformStyle = {
  transition?: boolean;
};

export type TargetAxis = {
  index: number;
  orientation: AxisOrientation;
};

export class ZoomMessage {
  eventType: 'start' | 'zoom' | 'end' | string;
  element?: ElementRef;
  axis: TargetAxis;
  domain?: [number, number];
  chartId: string;
  style?: TransformStyle;

  constructor(options?: {
    eventType: 'start' | 'zoom' | 'end' | string;
    element?: ElementRef;
    axis?: TargetAxis;
    domain?: [number, number];
    chartId: string;
    style?: TransformStyle;
  }) {
    this.eventType = options?.eventType;
    this.element = options?.element;
    this.axis = options?.axis;
    this.domain = options.domain;
    this.chartId = options?.chartId;
    this.style = options?.style;
  }
}

export class BrushMessage {
  chartId: string;
  selection: [number, number];
  mode?: 'drag' | 'space' | 'handle' | 'center' | 'init';

  constructor(options?: {
    chartId: string;
    selection: [number, number];
    mode?: 'drag' | 'space' | 'handle' | 'center' | 'init';
  }) {
    this.chartId = options?.chartId;
    this.selection = options?.selection;
    this.mode = options?.mode;
  }
}

export interface IBroadcastMessage<T> {
  channel: string;
  message: T;
}
