import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {TableService} from '../service/table.service';
import {TableColumn} from '../contract/table-column';
import {FilterState} from '../../filter/contarct/filter-state';
import {ITreeData} from '../../../common/contract/i-tree-data';
import {TableRow} from '../contract/table-row';
import {TetaConfigService} from '../../../locale/teta-config.service';
import {HeadDropdownTab} from '../contract/head-dropdown-tab';

@Component({
  selector: 'teta-head-cell-dropdown',
  templateUrl: './head-cell-dropdown.component.html',
  styleUrls: ['./head-cell-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadCellDropdownComponent<T> implements OnInit, OnDestroy {
  @Input() columns: ITreeData[];
  @Input() column: TableColumn;
  @Input() state: FilterState;
  @Input() data: TableRow<T>[];
  @Input() tabTemplates: HeadDropdownTab[];
  @Input() dropDownOpen: boolean;
  @Output() dropDownOpenChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(private _svc: TableService<T>,
              private _config: TetaConfigService,
              private _cdr: ChangeDetectorRef) {
  }

  closeDropdown = () => {
    this.dropDownOpen = false;
    this.dropDownOpenChange.emit(false);
  };

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  trackIndex(index) {
    return index;
  }
}
