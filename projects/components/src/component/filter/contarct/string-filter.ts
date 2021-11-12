import {FilterBase} from '../base/filter-base';
import {StringFilterType} from '../enum/string-filter-type.enum';

export class StringFilter extends FilterBase {
  override value: string;
  type: StringFilterType;


  constructor(options?: {
    value?: string;
    type?: StringFilterType;
    field: string;
    name: string;
  }) {
    super(options);
    if (options) {
      this.value = options.value || this.value;
      this.type = options.type || StringFilterType.Contains;
    }
  }
}
