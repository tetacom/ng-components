import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

import { ITreeData } from '../../../../common/contract/i-tree-data';
import { ArrayUtil } from '../../../../common/util/array-util';
import { TetaConfigService } from '../../../../locale/teta-config.service';
import { TetaLocalisation } from '../../../../locale/teta-localisation';
import { FilterState } from '../../../filter/contarct/filter-state';
import { TableColumn } from '../../contract/table-column';
import { TableService } from '../../service/table.service';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../../../button/button/button.component';
import { ToolbarComponent } from '../../../toolbar/toolbar/toolbar.component';
import { TreeItemToggleComponent } from '../../../tree/tree-item-toggle/tree-item-toggle.component';
import { TetaTemplateDirective } from '../../../../directive/teta-template/teta-template.directive';
import { TreeComponent } from '../../../tree/tree/tree.component';
import { ScrollableComponent } from '../../../../directive/scrollable/scrollable/scrollable.component';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../checkbox/checkbox/checkbox.component';

@Component({
  selector: 'teta-visibility-dropdown-tab',
  templateUrl: './visibility-dropdown-tab.component.html',
  styleUrls: ['./visibility-dropdown-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CheckboxComponent,
    FormsModule,
    ScrollableComponent,
    TreeComponent,
    TetaTemplateDirective,
    TreeItemToggleComponent,
    ToolbarComponent,
    ButtonComponent,
    AsyncPipe,
  ],
})
export class VisibilityDropdownTabComponent<T> implements OnDestroy {
  @Input() columns: ITreeData[];
  @Input() column: TableColumn;
  @Input() state: FilterState;
  @Input() data: T[];
  @Input() close: () => void;

  locale: Observable<TetaLocalisation>;
  hiddenColumns: string[];

  get openItems() {
    if (this._openItems == null) {
      this._openItems = this.columns.map((_) => _);
    }
    return this._openItems;
  }

  set openItems(openItems: ITreeData[]) {
    this._openItems = openItems;
  }

  get childMode() {
    return this.columns.find((_: any) => _.columns?.length > 0);
  }

  private _openItems: ITreeData[];
  private _alive = true;

  constructor(
    private _svc: TableService<T>,
    private _config: TetaConfigService,
    private _elementRef: ElementRef,
    private _cdr: ChangeDetectorRef,
  ) {
    this.locale = this._config.locale;
    this._svc.hiddenColumns
      .pipe(
        takeWhile((_) => this._alive),
        map((_) => [..._]),
      )
      .subscribe((_) => {
        this.hiddenColumns = _;
      });
  }

  columnIsHidden(column: TableColumn) {
    return this.hiddenColumns.indexOf(column.name) >= 0;
  }

  allColumnsVisible() {
    if (this.hiddenColumns?.length <= 0) {
      return true;
    }
    const columns = ArrayUtil.flatten(this.columns, 'columns');
    const notHidden = columns.find((_) => this.hiddenColumns.indexOf(_.name) < 0);
    if (!notHidden) {
      return false;
    }
    return null;
  }

  setAllColumns(value: boolean) {
    if (value) {
      this.hiddenColumns = [];
    } else {
      this.hiddenColumns = ArrayUtil.flatten(this.columns, 'columns').map((_) => _.name);
    }
  }

  setColumnsVisibility() {
    this._svc.setHiddenColumns(this.hiddenColumns);
  }

  compareItems = (item: any) => item.name;

  setColumnVisibility(item: TableColumn, visible: boolean) {
    this.setChildrenVisibility(item, visible, this.hiddenColumns);
    this.setParentsVisibility(item, visible, this.hiddenColumns);
  }

  setChildrenVisibility = (column: TableColumn, visible: boolean, hiddenColumns: string[]) => {
    if (visible) {
      this.showColumn(column, hiddenColumns);
    } else {
      this.hideColumn(column, hiddenColumns);
    }
    if (column.columns) {
      column.columns.forEach((x) => {
        this.setChildrenVisibility(x, visible, hiddenColumns);
      });
    }
  };

  setParentsVisibility = (column: TableColumn, visible: boolean, hiddenColumns: string[]) => {
    if (!visible) {
      this.hideParents(column, hiddenColumns);
    } else {
      this.showParents(column, hiddenColumns);
    }
  };

  showParents(column: TableColumn, hiddenColumns: string[]) {
    const parent = this.findParentColumn(column, this.columns as TableColumn[]);
    if (parent && this.columnIsHidden(parent)) {
      this.showColumn(parent, hiddenColumns);
      this.showParents(parent, hiddenColumns);
    }
  }

  hideParents(column: TableColumn, hiddenColumns: string[]) {
    const parent = this.findParentColumn(column, this.columns as TableColumn[]);
    if (
      parent &&
      !this.columnIsHidden(parent) &&
      parent.columns &&
      parent.columns.every((_) => this.columnIsHidden(_))
    ) {
      this.hideColumn(parent, hiddenColumns);
      this.hideParents(parent, hiddenColumns);
    }
  }

  hideColumn(column: TableColumn, hiddenColumns: string[]) {
    hiddenColumns.push(column.name);
  }

  showColumn(column: TableColumn, hiddenColumns: string[]) {
    hiddenColumns.splice(hiddenColumns.indexOf(column.name), 1);
  }

  private findParentColumn(column: TableColumn, columns: TableColumn[]): TableColumn | null {
    return ArrayUtil.findRecursive(columns, (iterableNode) => iterableNode.columns?.indexOf(column) >= 0, 'columns');
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
