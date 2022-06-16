import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TableService } from '../service/table.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'teta-selection-cell',
  templateUrl: './selection-cell.component.html',
  styleUrls: ['./selection-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionCellComponent<T> implements OnInit, OnDestroy {
  @Input() row: T;

  @HostBinding('class.cell') private readonly tableCellClass = true;
  selectedRows: T[] = [];

  private _alive = true;

  constructor(private _svc: TableService<T>, private _cdr: ChangeDetectorRef) {}

  selectRow(value: boolean) {
    if (value) {
      this._svc.selectRow(this.row);
    } else {
      this._svc.deselectRow(this.row);
    }
  }

  ngOnInit(): void {
    this._svc.selectedRows
      .pipe(takeWhile((_) => this._alive))
      .subscribe((_) => {
        this.selectedRows = _;
        this._cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
