import { AxisOptions } from '../model/axis-options';
import { ScaleType } from '../model/enum/scale-type';

export const defaultAxisConfig: AxisOptions = {
  visible: true,
  zoom: true,
  scaleType: {
    type: ScaleType.linear,
  },
};
