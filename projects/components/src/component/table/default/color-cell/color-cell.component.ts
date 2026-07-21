import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ColorInputComponent } from '../../../input/color-input/color-input.component';
import { CellComponentBase } from '../../base/cell-component-base';
import { ICellCoordinates } from '../../contract/i-cell-coordinates';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsUtil } from '../../../../util/forms-util';

@Component({
  selector: 'teta-color-cell',
  imports: [ReactiveFormsModule, ColorInputComponent],
  templateUrl: './color-cell.component.html',
  styleUrl: './color-cell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [FormsUtil.formProvider],
})
export class ColorCellComponent<T> extends CellComponentBase<T> implements OnInit {
  @ViewChild('input', { static: false }) input: ColorInputComponent;
  @HostBinding('attr.tabindex') readonly tabindex = 0;

  @HostListener('focus', ['$event'])
  @HostListener('focusin', ['$event'])
  focus(event) {
    this.svc.startEditCell({
      row: this.index,
      column: this.column.name,
      event: event,
    });
  }

  stopEditDeferred(): void {
    setTimeout(() => this.svc.startEditCell(null));
  }

  startEdit(initiator: ICellCoordinates, type: 'cell' | 'row'): void {
    if (initiator?.column === this.column.name) {
      this.cdr.detectChanges();
      this.input.input.nativeElement?.focus();
      this.input.input.nativeElement?.click();
    }
  }

  stopEdit(): void {
    this.cdr.detectChanges();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
