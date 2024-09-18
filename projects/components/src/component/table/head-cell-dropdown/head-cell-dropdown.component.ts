import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

import { ITreeData } from '../../../common/contract/i-tree-data';
import { TetaConfigService } from '../../../locale/teta-config.service';
import { FilterState } from '../../filter/contarct/filter-state';
import { HeadDropdownTab } from '../contract/head-dropdown-tab';
import { TableColumn } from '../contract/table-column';
import { TableService } from '../service/table.service';
import { NgTemplateOutlet } from '@angular/common';
import { TabContentDirective } from '../../tabs/tab-content.directive';
import { IconComponent } from '../../icon/icon/icon.component';
import { TabTitleDirective } from '../../tabs/tab-title.directive';
import { TabComponent } from '../../tabs/tab/tab.component';
import { TabsComponent } from '../../tabs/tabs/tabs.component';

@Component({
  selector: 'teta-head-cell-dropdown',
  templateUrl: './head-cell-dropdown.component.html',
  styleUrls: ['./head-cell-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TabsComponent, TabComponent, TabTitleDirective, IconComponent, TabContentDirective, NgTemplateOutlet],
})
export class HeadCellDropdownComponent<T> {
  @Input() columns: ITreeData[];
  @Input() column: TableColumn;
  @Input() state: FilterState;
  @Input() data: T[];
  @Input() tabTemplates: HeadDropdownTab[];
  @Input() dropDownOpen: boolean;
  @Output() dropDownOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _svc: TableService<T>, private _config: TetaConfigService, private _cdr: ChangeDetectorRef) {}

  closeDropdown = () => {
    this.dropDownOpen = false;
    this.dropDownOpenChange.emit(false);
  };

  trackIndex(index) {
    return index;
  }
}
