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
  Type,
} from 'd3-svg-annotation';

import {BasePoint} from './base-point';
import {SvgAttributes} from './svg-attributes';

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

export type AnnotationTypes = typeof annotationMap[number];

export interface Annotation {
  point: BasePoint;
  yAxisIndex: number;
  xAxisIndex: number;
  type?: AnnotationTypes;
  enabled?: boolean;
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
  style?: SvgAttributes;
}
