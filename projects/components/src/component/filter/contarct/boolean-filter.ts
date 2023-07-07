import {FilterBase} from '../base/filter-base';

export class BooleanFilter extends FilterBase<boolean> {
  constructor(options?: { value?: boolean; field: string; name: string }) {
    super(options);
    this.value = !!options?.value;
  }
}
