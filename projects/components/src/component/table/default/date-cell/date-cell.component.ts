import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { DatePickerComponent } from '../../../date-picker/date-picker/date-picker.component';
import { CellComponentBase } from '../../base/cell-component-base';
import { ICellCoordinates } from '../../contract/i-cell-coordinates';
import { TableService } from '../../service/table.service';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'teta-date-cell',
  templateUrl: './date-cell.component.html',
  styleUrls: ['./date-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePickerComponent, FormsModule, ReactiveFormsModule, DatePipe],
})
export class DateCellComponent<T> extends CellComponentBase<T> implements OnInit {
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
        this.input?.focus();
        this.cdr.markForCheck();
      }, 0);
    }
  }

  stopEdit(): void {
    this.cdr.markForCheck();
  }
}
