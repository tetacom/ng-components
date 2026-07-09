import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CellComponentBase } from '../../base/cell-component-base';
import { ICellCoordinates } from '../../contract/i-cell-coordinates';
import { ColorUtil } from '../../util/color-util';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsUtil } from '../../../../util/forms-util';

@Component({
  selector: 'teta-color-cell',
  imports: [ReactiveFormsModule],
  templateUrl: './color-cell.component.html',
  styleUrl: './color-cell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [FormsUtil.formProvider],
})
export class ColorCellComponent<T> extends CellComponentBase<T> implements OnInit {
  @ViewChild('input', { static: false }) input: ElementRef;
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

  setControlValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    if (this.control?.value !== value) {
      this.control?.setValue(value);
    }
  }

  commitValue(event: Event): void {
    this.setControlValue(event);
    this.svc.startEditCell(null);
  }

  stopEditDeferred(): void {
    setTimeout(() => this.svc.startEditCell(null));
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
