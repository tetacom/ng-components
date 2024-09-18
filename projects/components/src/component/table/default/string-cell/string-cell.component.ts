import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Align } from '../../../../common/enum/align.enum';
import { CellComponentBase } from '../../base/cell-component-base';
import { ICellCoordinates } from '../../contract/i-cell-coordinates';
import { TableService } from '../../service/table.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HintDirective } from '../../../../directive/hint/hint.directive';

@Component({
  selector: 'teta-string-cell',
  templateUrl: './string-cell.component.html',
  styleUrls: ['./string-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HintDirective, FormsModule, ReactiveFormsModule],
})
export class StringCellComponent<T> extends CellComponentBase<T> implements OnInit {
  align = Align;
  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(public override svc: TableService<T>, public override cdr: ChangeDetectorRef) {
    super(svc, cdr);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  startEdit(initiator: ICellCoordinates, type: 'cell' | 'row'): void {
    if (initiator?.column === this.column.name) {
      this.cdr.detectChanges();
      this.input.nativeElement?.focus();
      this.input.nativeElement?.select();
    }
  }

  stopEdit(): void {
    this.cdr.detectChanges();
  }
}
