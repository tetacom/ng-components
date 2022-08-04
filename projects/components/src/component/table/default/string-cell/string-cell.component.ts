import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {CellComponentBase} from '../../base/cell-component-base';
import {TableColumn} from '../../contract/table-column';
import {TableService} from '../../service/table.service';
import {ICellCoordinates} from '../../contract/i-cell-coordinates';
import {Align} from '../../../../common/enum/align.enum';

@Component({
  selector: 'teta-string-cell',
  templateUrl: './string-cell.component.html',
  styleUrls: ['./string-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StringCellComponent<T>
  extends CellComponentBase<T>
  implements OnInit {
  align = Align;
  @Input() override column: TableColumn;
  @Input() override row: T;
  @ViewChild('input', {static: false}) input: ElementRef;

  constructor(public override svc: TableService<T>, public override cdr: ChangeDetectorRef) {
    super(svc, cdr);
  }

  setValue(): void {
    this.valueChanged();
  }

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
