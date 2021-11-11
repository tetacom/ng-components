import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { HeadCellComponentBase } from '../../base/head-cell-component-base';
import { TableColumn } from '../../contract/table-column';

@Component({
  selector: 'teta-default-head-cell',
  templateUrl: './default-head-cell.component.html',
  styleUrls: ['./default-head-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultHeadCellComponent
  extends HeadCellComponentBase
  implements OnInit
{
  private _column: TableColumn;

  @Input()
  set column(val: TableColumn) {
    this._column = val;
    this._cdr.detectChanges();
  }

  get column(): TableColumn {
    return this._column;
  }

  constructor(private _cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {}
}
