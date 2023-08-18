import * as d3 from 'd3';

import { BasePoint } from '../../../model/base-point';
import { AxisOrientation } from '../../../model/enum/axis-orientation';
import { ScaleType } from '../../../model/enum/scale-type';
import { IBuilder } from '../../../model/i-builder';
import { Axis } from '../axis';

export class ExtremesBuilder implements IBuilder<Axis, number[] | string[]> {
  private extentAccessorMap = new Map<
    AxisOrientation,
    (point: BasePoint) => number
  >()
    .set(AxisOrientation.x, _ => _.x)
    .set(AxisOrientation.y, _ => _.y);

  private extremes: number[] | string[] = [0, 1];

  build(settings: Axis): number[] | string[] {
    const options = settings.options;
    let extremes: number[] | string[] = [];
    const hasMin = options?.min != null;
    const hasMax = options?.max != null;

    if (!hasMin || !hasMax) {
      const linkedSeries = settings.linkedSeries();
      const data = linkedSeries.reduce((acc: BasePoint[], current) => {
        return acc.concat(current.data);
      }, []);
      const accessor = this.extentAccessorMap.get(settings.orientation);

      if (settings.options.scaleType.type === ScaleType.band) {
        extremes = data.map(accessor);
      } else {
        extremes = data.length > 0 ? d3.extent(data, accessor) : [0, 1];
      }
    }

    if (hasMin) {
      extremes[0] = options?.min;
    }

    if (hasMax) {
      extremes[1] = options?.max;
    }
    if (
      typeof extremes[0] === 'number' &&
      typeof extremes[1] === 'number' &&
      extremes[0] === extremes[1]
    ) {
      extremes[0] = extremes[0] - 1;
      extremes[1] = extremes[1] + 1;
    }
    this.extremes = extremes;
    return this.extremes;
  }
}
