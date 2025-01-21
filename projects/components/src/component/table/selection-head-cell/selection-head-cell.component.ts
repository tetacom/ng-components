import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { TableService } from '../service/table.service';
import { takeWhile } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../checkbox/checkbox/checkbox.component';

@Component({
    selector: 'teta-selection-head-cell',
    templateUrl: './selection-head-cell.component.html',
    styleUrls: ['./selection-head-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CheckboxComponent, FormsModule]
})
export class SelectionHeadCellComponent<T> implements OnInit, OnDestroy {
  @HostBinding('class.table-head__group') private readonly tableCellClass = true;

  private _alive = true;

  constructor(
    private _svc: TableService<T>,
    private _cdr: ChangeDetectorRef,
  ) {}

  selectAll(value: boolean) {
    if (value) {
      this._svc.selectAll();
    } else {
      this._svc.deselectAll();
    }
  }

  allSelected() {
    return this._svc.allRowsSelected();
  }

  ngOnInit(): void {
    this._svc.selectedRows.pipe(takeWhile((_) => this._alive)).subscribe((_) => {
      this._cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
