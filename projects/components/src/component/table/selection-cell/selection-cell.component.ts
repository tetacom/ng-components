import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  HostBinding,
  input,
  Signal,
} from '@angular/core';
import { TableService } from '../service/table.service';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../checkbox/checkbox/checkbox.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'teta-selection-cell',
  templateUrl: './selection-cell.component.html',
  styleUrls: ['./selection-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent, FormsModule],
})
export class SelectionCellComponent<T> {
  row = input.required<T>();

  @HostBinding('class.cell') private readonly tableCellClass = true;

  selectedRows: Signal<T[]>;

  isSelected: Signal<boolean>;

  constructor(
    private _svc: TableService<T>,
    private _cdr: ChangeDetectorRef,
  ) {
    this.selectedRows = toSignal(this._svc.selectedRows, {
      initialValue: [],
    });

    this.isSelected = computed(() => {
      const selectedRows = this.selectedRows();
      const row = this.row();
      if (row && selectedRows) {
        return selectedRows.indexOf(row) >= 0;
      }
      return false;
    });
  }

  selectRow(value: boolean) {
    if (value) {
      this._svc.selectRow(this.row());
    } else {
      this._svc.deselectRow(this.row());
    }
  }
}
