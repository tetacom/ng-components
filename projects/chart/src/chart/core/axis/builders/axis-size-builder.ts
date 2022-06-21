import { Axis } from '../axis';
import { AxisOrientation } from '../../../model/enum/axis-orientation';
import { maxIndex } from 'd3-array';
import { getTextWidth } from '../../utils/public-api';
import { IBuilder } from '../../../model/i-builder';

export class AxisSizeBuilder implements IBuilder<Axis, number> {
  private titlePadding = 10;
  private basePadding = 16;
  private backupRatio = 0.58;

  build(settings: Axis): number {
    let finalPadding = this.basePadding;

    if (settings.orientation === AxisOrientation.y) {
      const formatter = settings.defaultFormatter();

      finalPadding += settings.options.title ? this.titlePadding : 0;

      const scale = settings.defaultScale();
      const ticks = scale().domain(settings.extremes).ticks();

      const maxElementLengthIndex = maxIndex(
        ticks,
        (_) => formatter(_).length
      );


      finalPadding += getTextWidth(
        formatter(ticks[maxElementLengthIndex]),
        this.backupRatio
      );
    }

    if (settings.orientation === AxisOrientation.x) {
      finalPadding += finalPadding + 20;
    }

    return finalPadding;
  }
}
