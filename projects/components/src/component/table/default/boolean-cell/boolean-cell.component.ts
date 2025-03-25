import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { CellComponentBase } from '../../base/cell-component-base';
import { ICellCoordinates } from '../../contract/i-cell-coordinates';
import { TableService } from '../../service/table.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../checkbox/checkbox/checkbox.component';
import { FormsUtil } from '../../../../util/forms-util';

@Component({
  selector: 'teta-boolean-cell',
  templateUrl: './boolean-cell.component.html',
  styleUrls: ['./boolean-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [FormsUtil.formProvider],
  imports: [CheckboxComponent, FormsModule, ReactiveFormsModule],
})
export class BooleanCellComponent<T> extends CellComponentBase<T> implements OnInit {
  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(
    public override svc: TableService<T>,
    public override cdr: ChangeDetectorRef,
  ) {
    super(svc, cdr);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  startEdit(initiator: ICellCoordinates, type: 'cell' | 'row'): void {
    if (initiator?.column === this.column.name) {
      this.cdr.markForCheck();
      setTimeout(() => {
        this.input?.nativeElement.focus();
      }, 0);
    }
  }

  stopEdit(): void {
    this.cdr.markForCheck();
  }
}
