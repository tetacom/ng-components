import {FilterState} from '../contarct/filter-state';
import {EventEmitter} from '@angular/core';
import {FilterItem} from '../contarct/filter-item';
import {IFilter} from '../contarct/i-filter';
import {IIdName} from '../../../common/contract/i-id-name';

export abstract class FilterComponentBase<T> {
  abstract column: FilterItem;
  abstract state: FilterState;
  abstract data: T[];
  abstract filterOptions: IIdName<any>[];
  abstract filterChanged: EventEmitter<IFilter>;
}
