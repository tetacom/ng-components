import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import {TableColumn} from '../contract/table-column';
import {IIdName} from '../../../common/contract/i-id-name';
import {IDictionary} from '../../../common/contract/i-dictionary';

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
  @Input() row: T;
  @HostBinding('class.cell') private readonly tableCellClass = true;
}
