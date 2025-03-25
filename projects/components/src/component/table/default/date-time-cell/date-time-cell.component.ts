import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { DatePickerComponent } from '../../../date-picker/date-picker/date-picker.component';
import { CellComponentBase } from '../../base/cell-component-base';
import { ICellCoordinates } from '../../contract/i-cell-coordinates';
import { TableService } from '../../service/table.service';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsUtil } from '../../../../util/forms-util';

@Component({
  selector: 'teta-date-time-cell',
  templateUrl: './date-time-cell.component.html',
  styleUrls: ['./date-time-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [FormsUtil.formProvider],
  imports: [DatePickerComponent, FormsModule, ReactiveFormsModule, DatePipe],
})
export class DateTimeCellComponent<T> extends CellComponentBase<T> implements OnInit {
  @ViewChild('input', { static: false }) input: DatePickerComponent;

  constructor(
    protected override svc: TableService<T>,
    protected override cdr: ChangeDetectorRef,
  ) {
    super(svc, cdr);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  startEdit(initiator: ICellCoordinates, type: 'cell' | 'row'): void {
    if (initiator?.column === this.column.name) {
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
