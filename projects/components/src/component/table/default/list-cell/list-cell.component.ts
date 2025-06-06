import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';

import { IIdName } from '../../../../common/contract/i-id-name';
import { VerticalAlign } from '../../../../common/enum/vertical-align.enum';
import { SelectComponent } from '../../../select/select/select.component';
import { CellComponentBase } from '../../base/cell-component-base';
import { ICellCoordinates } from '../../contract/i-cell-coordinates';
import { TableService } from '../../service/table.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../../icon/icon/icon.component';
import { FormsUtil } from '../../../../util/forms-util';

@Component({
  selector: 'teta-list-cell',
  templateUrl: './list-cell.component.html',
  styleUrls: ['./list-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [FormsUtil.formProvider],
  imports: [SelectComponent, FormsModule, ReactiveFormsModule, IconComponent],
})
export class ListCellComponent<T> extends CellComponentBase<T> implements OnInit {
  open = signal(false);

  get displayFilterOptions(): IIdName<any>[] {
    if (this.column?.parentName?.length > 0) {
      const parentValue = this.row.data[this.column.parentName];
      if (parentValue) {
        return this.filterOptions.filter((_) => _.parentId === parentValue);
      }
    }
    return this.filterOptions;
  }

  @ViewChild('input', { static: false }) input: SelectComponent;

  verticalAlign = VerticalAlign;

  constructor(
    protected override svc: TableService<T>,
    protected override cdr: ChangeDetectorRef,
  ) {
    super(svc, cdr);
  }

  startEdit(initiator: ICellCoordinates, type: 'cell' | 'row'): void {
    if (initiator?.column === this.column.name) {
      setTimeout(() => {
        this.input?.focus();
        this.cdr.markForCheck();
      }, 0);
      this.open.set(true);
    }
  }

  stopEdit() {
    this.open.set(false);
    this.cdr.markForCheck();
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  protected getValue(value) {
    if (this.filterOptions === null || this.filterOptions === undefined || !(this.filterOptions instanceof Array)) {
      return '';
    }
    const item = this.filterOptions.find((option) => option.id === value);
    if (item === null || item === undefined) {
      return '';
    }
    return item.name;
  }
}
