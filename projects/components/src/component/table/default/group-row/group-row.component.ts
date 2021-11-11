import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { GroupRowComponentBase } from '../../base/group-row-component-base';
import { TableRow } from '../../contract/table-row';
import { TableColumn } from '../../contract/table-column';

@Component({
  selector: 'teta-group-row',
  templateUrl: './group-row.component.html',
  styleUrls: ['./group-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupRowComponent<T>
  extends GroupRowComponentBase<T>
  implements OnInit
{
  @Input() row: TableRow<T>;
  @Input() columns: TableColumn[];

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
