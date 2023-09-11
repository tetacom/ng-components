import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { ITreeData } from '../../../common/contract/i-tree-data';
import { TetaConfigService } from '../../../locale/teta-config.service';
import { FilterState } from '../../filter/contarct/filter-state';
import { HeadDropdownTab } from '../contract/head-dropdown-tab';
import { TableColumn } from '../contract/table-column';
import { TableService } from '../service/table.service';

@Component({
  selector: 'teta-head-cell-dropdown',
  templateUrl: './head-cell-dropdown.component.html',
  styleUrls: ['./head-cell-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadCellDropdownComponent<T> {
  @Input() columns: ITreeData[];
  @Input() column: TableColumn;
  @Input() state: FilterState;
  @Input() data: T[];
  @Input() tabTemplates: HeadDropdownTab[];
  @Input() dropDownOpen: boolean;
  @Output() dropDownOpenChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    private _svc: TableService<T>,
    private _config: TetaConfigService,
    private _cdr: ChangeDetectorRef
  ) {}

  closeDropdown = () => {
    this.dropDownOpen = false;
    this.dropDownOpenChange.emit(false);
  };

  trackIndex(index) {
    return index;
  }
}
