import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild,} from '@angular/core';
import {CellComponentBase} from '../../base/cell-component-base';
import {TableColumn} from '../../contract/table-column';
import {TableRow} from '../../contract/table-row';
import {TableService} from '../../service/table.service';
import {ICellCoordinates} from '../../contract/i-cell-coordinates';
import {DatePickerComponent} from '../../../date-picker/date-picker/date-picker.component';

@Component({
  selector: 'teta-date-time-cell',
  templateUrl: './date-time-cell.component.html',
  styleUrls: ['./date-time-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimeCellComponent<T>
  extends CellComponentBase<T>
  implements OnInit {
  @Input() override column: TableColumn;
  @Input() override row: TableRow<T>;

  @ViewChild('input', {static: false}) input: DatePickerComponent;

  constructor(
    protected override svc: TableService<T>,
    protected override cdr: ChangeDetectorRef
  ) {
    super(svc, cdr);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  setValue(value: Date): void {
    this.row.data[this.column.name] = value;
    this.valueChanged();
  }

  startEdit(initiator: ICellCoordinates<T>, type: 'cell' | 'row'): void {
    if (initiator?.column.name === this.column.name) {
      setTimeout(() => {
        this.input?.openPicker(true);
        this.cdr.markForCheck();
      }, 0);
    }
  }

  stopEdit(): void {
    this.cdr.markForCheck();
  }
}
