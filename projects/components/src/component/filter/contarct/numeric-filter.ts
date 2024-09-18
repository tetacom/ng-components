import { FilterBase } from '../base/filter-base';
import { NumericFilterValue } from './numeric-filter-value';

export class NumericFilter extends FilterBase<NumericFilterValue> {
  strict: boolean;

  constructor(options?: { value?: NumericFilterValue; strict?: boolean; field: string; name: string }) {
    super(options);
    this.value = options?.value || this.value;
    this.strict = options?.strict || false;
  }
}
