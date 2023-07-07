import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {CellComponentBase} from '../../base/cell-component-base';
import {TableService} from '../../service/table.service';
import {ICellCoordinates} from '../../contract/i-cell-coordinates';

@Component({
  selector: 'teta-numeric-cell',
  templateUrl: './numeric-cell.component.html',
  styleUrls: ['./numeric-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumericCellComponent<T>
  extends CellComponentBase<T>
  implements OnInit {
  @ViewChild('input', {static: false}) input: ElementRef;

  constructor(
    protected override svc: TableService<T>,
    protected override cdr: ChangeDetectorRef
  ) {
    super(svc, cdr);
  }

  applyValue(value) {
    this.row[this.column.name] = value;
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
      // this.input.nativeElement?.select();
      // this.cdr.detectChanges();

      // setTimeout(() => {
      //   this.input?.nativeElement.focus();
      //   this.input?.nativeElement.select();
      //   this.cdr.markForCheck();
      // }, 0);
    }
  }

  stopEdit(): void {
    this.cdr.markForCheck();
  }
}
