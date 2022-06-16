import {Component, HostBinding} from '@angular/core';
import {TableColumn} from '../contract/table-column';

@Component({
  template: ''
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class HeadCellComponentBase<T> {
  @HostBinding('class.table-head__cell__component')

  abstract column: TableColumn;
  abstract data: T[];
}
