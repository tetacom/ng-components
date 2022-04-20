import {IFilter} from '../contarct/i-filter';
import {StringUtil} from '../../../util/string-util';

export class FilterBase implements IFilter {
  field: string;
  name: string;
  value: any;

  constructor(options?: {
    field: string;
    name: string;
  }) {
    if (options) {
      this.field = StringUtil.firstLetterToLower(options.field);
      this.name = StringUtil.firstLetterToLower(options.name);
    }
  }
}
