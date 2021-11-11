import {IFilter} from '../contarct/i-filter';

export class FilterBase implements IFilter {
  field: string;
  name: string;
  value: any;

  constructor(options?: {
    field: string;
    name: string;
  }) {
    if (options) {
      this.field = options.field;
      this.name = options.name;
    }
  }
}
