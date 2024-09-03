import { Axis } from '../axis';
import { AxisOrientation } from '../../../model/enum/axis-orientation';
import { maxIndex } from 'd3-array';
import { getTextWidth } from '../../utils/public-api';
import { IBuilder } from '../../../model/i-builder';
import { ScaleType } from '../../../model/enum/scale-type';

export class AxisSizeBuilder implements IBuilder<Axis, number> {
  private titlePadding = 11;
  private basePadding = 16;
  private backupRatio = 0.58;

  build(settings: Axis): number {
    let finalPadding = this.basePadding;

    if (settings.orientation === AxisOrientation.y) {
      const formatter = settings.options.tickFormat || settings.defaultFormatter();

      finalPadding += settings.options.title ? this.titlePadding : 0;

      const scale = settings.defaultScale()();
      scale.domain(settings.extremes);

      if (settings.options.scaleType.type === ScaleType.band) {
        scale.ticks = (ticks?: number) => {
          return scale.domain();
        };
      }
      const ticks = scale.ticks(20);

      const maxElementLengthIndex = maxIndex(ticks, (_) => formatter(_).length);

      finalPadding += getTextWidth(formatter(ticks[maxElementLengthIndex]), this.backupRatio);
    }

    if (settings.orientation === AxisOrientation.x) {
      finalPadding += finalPadding + 20;
    }

    return finalPadding;
  }
}
