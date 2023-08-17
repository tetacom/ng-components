import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { FormsUtil } from '../../../../util/forms-util';
import { CellComponentBase } from '../../base/cell-component-base';
import { ICellCoordinates } from '../../contract/i-cell-coordinates';
import { TableService } from '../../service/table.service';

@Component({
  selector: 'teta-numeric-cell',
  templateUrl: './numeric-cell.component.html',
  styleUrls: ['./numeric-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [FormsUtil.formProvider],
})
export class NumericCellComponent<T>
  extends CellComponentBase<T>
  implements OnInit
{
  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(
    protected override svc: TableService<T>,
    protected override cdr: ChangeDetectorRef
  ) {
    super(svc, cdr);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  startEdit(initiator: ICellCoordinates, type: 'cell' | 'row'): void {
    if (initiator?.column === this.column.name) {
      this.cdr.detectChanges();
      this.input.nativeElement?.focus();
    }
  }

  stopEdit(): void {
    this.cdr.markForCheck();
  }
}
