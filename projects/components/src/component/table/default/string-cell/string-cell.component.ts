import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Align } from '../../../../common/enum/align.enum';
import { CellComponentBase } from '../../base/cell-component-base';
import { ICellCoordinates } from '../../contract/i-cell-coordinates';
import { TableService } from '../../service/table.service';

@Component({
  selector: 'teta-string-cell',
  templateUrl: './string-cell.component.html',
  styleUrls: ['./string-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StringCellComponent<T>
  extends CellComponentBase<T>
  implements OnInit
{
  align = Align;
  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(
    public override svc: TableService<T>,
    public override cdr: ChangeDetectorRef
  ) {
    super(svc, cdr);
  }

  // setValue(): void {
  //   this.valueChanged();
  // }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  startEdit(initiator: ICellCoordinates, type: 'cell' | 'row'): void {
    if (initiator?.column === this.column.name) {
      this.cdr.detectChanges();
      this.input.nativeElement?.focus();
      this.input.nativeElement?.select();
      // this.cdr.detectChanges();
      // this.input.nativeElement?.focus();
      // this.input.nativeElement?.select();
      // this.cdr.detectChanges();
      // setTimeout(() => {
      //   this.input.nativeElement?.focus();
      //   this.input.nativeElement?.select();
      // }, 0);
    }
  }

  stopEdit(): void {
    this.cdr.detectChanges();
  }
}
