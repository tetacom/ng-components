import { AxisType } from '../model/enum/axis-type';
import { AxisOptions } from '../model/axis-options';

export const defaultAxisConfig: AxisOptions = {
  type: AxisType.number,
  visible: true,
  zoom: true,
};
