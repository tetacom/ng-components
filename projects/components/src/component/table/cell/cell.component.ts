import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

import { IDictionary } from '../../../common/contract/i-dictionary';
import { IIdName } from '../../../common/contract/i-id-name';
import { TableColumn } from '../contract/table-column';
import { TableRow } from '../contract/table-row';

@Component({
  selector: 'teta-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent<T> {
  @Input() column: TableColumn;
  @Input() filterOptions: IIdName<any>[];
  @Input() dict: IDictionary<IIdName<any>[]>;
  @Input() row: TableRow<T>;
  @HostBinding('class.cell') private readonly tableCellClass = true;
}
