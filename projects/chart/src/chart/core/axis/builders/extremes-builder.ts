import {IBuilder} from '../../../model/i-builder';
import {Axis} from '../axis';
import {BasePoint} from '../../../model/base-point';
import {AxisOrientation} from '../../../model/enum/axis-orientation';

import * as d3 from 'd3';
import {ScaleType} from "../../../model/enum/scale-type";

export class ExtremesBuilder implements IBuilder<Axis, number[] | string[]> {
  private extentAccessorMap = new Map<AxisOrientation,
    (point: BasePoint) => number>()
    .set(AxisOrientation.x, (_) => _.x)
    .set(AxisOrientation.y, (_) => _.y);

  private extremes: number[] | string[] = [0, 0];

  build(settings: Axis): number[] | string[] {
    const options = settings.options;

    const hasMin = options?.min != null;
    const hasMax = options?.max != null;

    if (!hasMin || !hasMax) {
      const linkedSeries = settings.linkedSeries();
      const data = linkedSeries.reduce((acc: BasePoint[], current) => {
        return acc.concat(current.data);
      }, []);
      const accessor = this.extentAccessorMap.get(settings.orientation);
      this.extremes = data.length > 1 ? d3.extent(data, accessor) : [0, 0];

      if(settings.options.scaleType.type === ScaleType.band) {
        this.extremes = data.map(accessor)
      }

    }

    if (hasMin) {
      this.extremes[0] = options?.min;
    }

    if (hasMax) {
      this.extremes[1] = options?.max;
    }

    return this.extremes;
  }
}
