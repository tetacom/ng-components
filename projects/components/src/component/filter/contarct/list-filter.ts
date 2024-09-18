import { FilterBase } from '../base/filter-base';
import { ListFilterType } from '../enum/list-filter-type.enum';

export class ListFilter extends FilterBase<any[]> {
  type: ListFilterType;

  constructor(options?: { value?: any[]; type?: ListFilterType; field: string; name: string }) {
    super(options);
    if (options) {
      this.value = options.value || this.value;
      this.type = options.type || ListFilterType.None;
    }
  }
}
