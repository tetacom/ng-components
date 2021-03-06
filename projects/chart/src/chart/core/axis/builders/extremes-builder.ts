import {IBuilder} from '../../../model/i-builder';
import {Axis} from '../axis';
import {BasePoint} from '../../../model/base-point';
import {AxisOrientation} from '../../../model/enum/axis-orientation';

import * as d3 from 'd3';

export class ExtremesBuilder implements IBuilder<Axis, [number, number]> {
  private extentAccessorMap = new Map<AxisOrientation,
    (point: BasePoint) => number>()
    .set(AxisOrientation.x, (_) => _.x)
    .set(AxisOrientation.y, (_) => _.y);

  private extremes: [number, number] = [0, 0];

  build(settings: Axis): [number, number] {
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
