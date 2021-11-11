import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TableColumn } from '../contract/table-column';
import { TableRow } from '../contract/table-row';
import { TableService } from '../service/table.service';
import { IIdName } from '../../../common/contract/i-id-name';
import { IDictionary } from '../../../common/contract/i-dictionary';

@Component({
  selector: 'teta-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent<T> implements OnInit, OnDestroy {
  @Input() column: TableColumn;
  @Input() filterOptions: IIdName<any>[];
  @Input() dict: IDictionary<IIdName<any>[]>;
  @Input() row: TableRow<T>;
  @HostBinding('class.cell') private readonly tableCellClass = true;

  private alive = true;

  constructor(protected _svc: TableService<T>) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.alive = false;
  }
}
