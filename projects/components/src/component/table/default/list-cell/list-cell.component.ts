import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {TableColumn} from '../../contract/table-column';
import {TableRow} from '../../contract/table-row';
import {TableService} from '../../service/table.service';
import {CellComponentBase} from '../../base/cell-component-base';
import {SelectComponent} from '../../../select/select/select.component';
import {IIdName} from '../../../../common/contract/i-id-name';
import {ICellCoordinates} from '../../contract/i-cell-coordinates';
import {VerticalAlign} from '../../../../common/enum/vertical-align.enum';

@Component({
  selector: 'teta-list-cell',
  templateUrl: './list-cell.component.html',
  styleUrls: ['./list-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCellComponent<T>
  extends CellComponentBase<T>
  implements OnInit {
  @Input() override column: TableColumn;
  @Input() override row: TableRow<T>;
  @Input() override filterOptions: IIdName<any>[] = [];

  get value() {
    return this.getValue();
  }

  get displayFilterOptions(): IIdName<any>[] {
    if (this.column?.parentName?.length > 0) {
      const parentValue = this.row.data[this.column.parentName];
      if (parentValue) {
        return this.filterOptions.filter(_ => _.parentId === parentValue);
      }
    }
    return this.filterOptions;
  }

  @ViewChild('input', {static: false}) input: SelectComponent;

  verticalAlign = VerticalAlign;

  constructor(
    protected override svc: TableService<T>,
    protected override cdr: ChangeDetectorRef
  ) {
    super(svc, cdr);
  }

  setValue(value: any): void {
    // if(this.c)
    this.row.data[this.column.name] = value;
    this.valueChanged();
  }

  startEdit(initiator: ICellCoordinates, type: 'cell' | 'row'): void {
    if (initiator?.column === this.column.name) {
      setTimeout(() => {
        this.input?.focus();
        this.cdr.markForCheck();
      }, 0);
    }
  }

  stopEdit() {
    this.cdr.markForCheck();
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  private getValue() {
    if (
      this.filterOptions === null ||
      this.filterOptions === undefined ||
      !(this.filterOptions instanceof Array)
    ) {
      return '';
    }
    const item = this.filterOptions.find(
      (option) => option.id === this.row.data[this.column.name]
    );
    if (item === null || item === undefined) {
      return '';
    }
    return item.name;
  }
}
