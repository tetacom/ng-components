import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { map, takeWhile } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormsUtil } from '../../../../util/forms-util';
import { CellComponentBase } from '../../base/cell-component-base';
import { ICellCoordinates } from '../../contract/i-cell-coordinates';
import { TableService } from '../../service/table.service';
import { NumberPipe } from '../../../../pipe/number-pipe/number.pipe';
import { OnlyNumberDirective } from '../../../../directive/only-number/only-number.directive';

@Component({
  selector: 'teta-numeric-cell',
  templateUrl: './numeric-cell.component.html',
  styleUrls: ['./numeric-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [FormsUtil.formProvider],
  imports: [FormsModule, OnlyNumberDirective, ReactiveFormsModule, NumberPipe],
})
export class NumericCellComponent<T> extends CellComponentBase<T> implements OnInit, OnDestroy {
  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(
    protected override svc: TableService<T>,
    protected override cdr: ChangeDetectorRef,
    private el: ElementRef,
  ) {
    super(svc, cdr);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    if (this.column.fillPercentage) {
      this.svc.numberColumnsMaxValues
        .pipe(
          takeWhile(() => this._alive),
          map((data) => {
            const columnMaxValue = data[this.column.name];

            const fillPercentage = Math.round((this.control.value * 100) / columnMaxValue);
            this.el.nativeElement.classList.add('fill-percentage');
            this.el.nativeElement.style.setProperty('--fillPercentage', `${fillPercentage}%`);
          }),
        )
        .subscribe();
    }
  }

  startEdit(initiator: ICellCoordinates): void {
    if (initiator?.column === this.column.name) {
      this.cdr.detectChanges();
      this.input.nativeElement?.focus();
    }
  }

  stopEdit(): void {
    this.cdr.markForCheck();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }
}
