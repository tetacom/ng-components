import {Component, HostBinding} from '@angular/core';
import {TableColumn} from '../contract/table-column';
import {TableRow} from '../contract/table-row';

@Component({
  template: ''
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class HeadCellComponentBase<T> {
  @HostBinding('class.table-head__cell__component')

  abstract column: TableColumn;
  abstract data: TableRow<T>[];
}
