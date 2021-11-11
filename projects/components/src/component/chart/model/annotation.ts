import {
  annotationBadge,
  annotationCallout,
  annotationCalloutCircle,
  annotationCalloutCurve,
  annotationCalloutElbow,
  annotationCalloutRect,
  annotationCustomType,
  annotationLabel,
  annotationXYThreshold,
} from 'd3-svg-annotation';
import { BasePoint } from './point/base-point';

const annotationMap = [
  annotationBadge,
  annotationLabel,
  annotationCallout,
  annotationCalloutCircle,
  annotationCalloutCurve,
  annotationCalloutElbow,
  annotationCalloutRect,
  annotationCustomType,
  annotationXYThreshold,
] as const;

type AnnotationTypes = typeof annotationMap[number];

export class Annotation {
  point: BasePoint;
  yAxisIndex: number;
  xAxisIndex: number;
  type?: AnnotationTypes;
  enabled?: boolean;
  fillColor?: string;
  borderWidth?: number;
  borderColor?: string;
  dx?: number;
  dy?: number;
  className?: string;
  connector?: {
    end: string;
  };
  note?: {
    label?: string;
    title?: string;
    bgPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
    bgRadius?: boolean;
  };

  constructor(options?: {
    point: BasePoint;
    type?: AnnotationTypes;
    yAxisIndex: number;
    xAxisIndex: number;
    enabled?: boolean;
    fillColor?: string;
    borderWidth?: number;
    borderColor?: string;
    dx?: number;
    dy?: number;
    className?: string;
    connector?: {
      end: string;
    };
    note?: {
      label?: string;
      title?: string;
      bgPadding?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
      };
      bgRadius?: boolean;
    };
  }) {
    this.point = options?.point;
    this.yAxisIndex = options?.yAxisIndex;
    this.xAxisIndex = options?.xAxisIndex;
    this.type = options?.type || annotationLabel;
    this.enabled = options?.enabled;
    this.className = options?.className;
    this.fillColor = options?.fillColor;
    this.borderColor = options?.borderColor;
    this.borderWidth = options?.borderWidth;
    this.note = options?.note;
    this.connector = options?.connector;
    this.dx = options?.dx;
    this.dy = options?.dy;
  }
}
