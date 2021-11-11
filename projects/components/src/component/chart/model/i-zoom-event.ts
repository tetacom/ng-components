import { ZoomType } from './enum/zoom-type';
import { D3ZoomEvent, ZoomTransform } from 'd3';

export interface IZoomEvent {
  domain: [number, number];
  zoomType: ZoomType;
  zoomTransform?: ZoomTransform;
  event?: D3ZoomEvent<any, any>;
}
