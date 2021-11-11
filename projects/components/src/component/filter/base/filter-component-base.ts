import {FilterState} from '../contarct/filter-state';
import {EventEmitter} from '@angular/core';
import {FilterItem} from '../contarct/filter-item';
import {IFilter} from '../contarct/i-filter';
import {IIdName} from '../../../common/contract/i-id-name';

export abstract class FilterComponentBase {
  abstract column: FilterItem;
  abstract state: FilterState;
  abstract filterOptions: IIdName<any>[];

  abstract filterChanged: EventEmitter<IFilter>;
}
