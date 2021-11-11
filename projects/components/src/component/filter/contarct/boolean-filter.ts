import { FilterBase } from '../base/filter-base';

export class BooleanFilter extends FilterBase {
  override value: boolean;

  constructor(options?: { value?: boolean; field: string; name: string }) {
    super(options);
    if (options) {
      this.value = options.value;
    }
  }
}
