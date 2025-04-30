import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CellComponentBase } from '../../base/cell-component-base';
import { TableService } from '../../service/table.service';
import { ICellCoordinates } from '../../contract/i-cell-coordinates';
import { ColorUtil } from '../../util/color-util';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'teta-color-cell',
  imports: [FormsModule],
  templateUrl: './color-cell.component.html',
  styleUrl: './color-cell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorCellComponent<T> extends CellComponentBase<T> implements OnInit {
  @ViewChild('input', { static: false }) input: ElementRef;
  @HostBinding('attr.tabindex') private readonly tabindex = 0;

  @HostListener('focus', ['$event'])
  @HostListener('focusin', ['$event'])
  focus(event) {
    this.svc.startEditCell({
      row: this.index,
      column: this.column.name,
      event: event,
    });
  }

  constructor(
    public override svc: TableService<T>,
    public override cdr: ChangeDetectorRef,
  ) {
    super(svc, cdr);
  }

  setValue(): void {
    this.svc.startEditCell(null);
  }

  startEdit(initiator: ICellCoordinates, type: 'cell' | 'row'): void {
    if (initiator?.column === this.column.name) {
      this.cdr.detectChanges();
      this.input.nativeElement?.focus();
      this.input.nativeElement?.click();
    }
  }

  stopEdit(): void {
    this.cdr.detectChanges();
  }

  getHexColor(color: string) {
    return ColorUtil.getHexColor(color);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
