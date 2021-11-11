import {FilterBase} from '../base/filter-base';
import {DateFilterValue} from './date-filter-value';

export class DateFilter extends FilterBase {
  override value: DateFilterValue;

  constructor(options?: {
    value?: DateFilterValue;
    field: string;
    name: string;
  }) {
    super(options);
    if (options) {
      this.value = new DateFilterValue(options.value);
    }
  }
}
