import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef, HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import {TableColumn} from '../contract/table-column';
import {ColumnResizeEvent} from '../contract/column-resize-event';
import {FilterState} from '../../filter/contarct/filter-state';
import {TableService} from '../service/table.service';
import {map} from 'rxjs/operators';
import {SortParam} from '../../filter/contarct/sort-param';
import {StateUtil} from '../util/state-util';
import {VerticalAlign} from '../../../common/enum/vertical-align.enum';
import {Align} from '../../../common/enum/align.enum';
import {combineLatest, Observable} from 'rxjs';
import {HeadDropdownTab} from '../contract/head-dropdown-tab';

@Component({
  selector: 'teta-head-cell',
  templateUrl: './head-cell.component.html',
  styleUrls: ['./head-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadCellComponent<T> implements OnInit, OnDestroy {
  @Input() column: TableColumn;
  @Input() showHeadCellMenu: boolean;
  @Input() data: T[];

  verticalAlign = VerticalAlign;
  align = Align;
  state: Observable<FilterState>;
  columns: Observable<TableColumn[]>;
  filtered: Observable<boolean>;
  sortParam: Observable<SortParam>;
  iconName: Observable<string>;
  @HostBinding('class.table-head__cell_active')
  dropDownOpen: boolean;
  showDrag: 'left' | 'right' | null = null;
  private rect: any;

  private _alive = true;
  private _startPosition: number;

  @ViewChild('mainTemplate', {static: true}) mainTemplate: TemplateRef<any>;
  @ViewChild('filterTemplate', {static: true}) filterTemplate: TemplateRef<any>;
  @ViewChild('columnsTemplate', {static: true}) columnsTemplate: TemplateRef<any>;

  get defaultTemplates(): HeadDropdownTab[] {
    return [
      {
        icon: 'menu',
        template: this.mainTemplate,
        order: 10,
        showTab: () => true,
      }, {
        icon: 'filter',
        template: this.filterTemplate,
        order: 20,
        showTab: (column) => column.filterable,
      }, {
        icon: 'eye',
        template: this.columnsTemplate,
        order: 30,
        showTab: () => true,
      }
    ];
  }

  get tabTemplates() {
    if (this.column?.headDropdownConfig && this.column.headDropdownConfig.tabs?.length > 0) {
      if (this.column.headDropdownConfig.strategy === 'replace') {
        return this.column.headDropdownConfig.tabs;
      }
      return [...this.defaultTemplates, ...this.column.headDropdownConfig.tabs]
        .sort((a, b) => a.order - b.order);
    }

    return this.defaultTemplates;
  }

  constructor(
    private _svc: TableService<T>,
    private _app: ApplicationRef,
    private _elementRef: ElementRef
  ) {
  }

  dragstart(event: DragEvent): void {
    if (event && event.dataTransfer) {
      event.dataTransfer.setData('text', 'move');
    }
    this._svc.dragStart(this.column);
  }

  @HostListener('dragenter', ['$event']) dragenter(event: DragEvent): void {
    this.rect = this._elementRef.nativeElement.getBoundingClientRect();
  }

  @HostListener('dragover', ['$event']) allowDrop(event: DragEvent): void {
    event.preventDefault();
    if (this.rect && this._svc.dragSource) {
      this.showDrag =
        event.clientX >= this.rect.x + this.rect.width / 2 ? 'right' : 'left';
    }
  }

  @HostListener('dragleave', ['$event']) dragleave(event: DragEvent): void {
    event.preventDefault();
    this.showDrag = null;
  }

  @HostListener('dragend', ['$event']) dragend(event: DragEvent): void {
    this.showDrag = null;
  }

  @HostListener('drop', ['$event']) drop(event: DragEvent): void {
    const move = event.dataTransfer && event.dataTransfer.getData('text');
    if (move === 'move') {
      this._svc.reorderColumn(this.column, this.showDrag === 'left');
    }
    this.showDrag = null;
  }

  ngOnInit(): void {
    this.columns = this._svc.columns;
    this.state = this._svc.state;
    this.sortParam = this.state.pipe(
      map((_) => StateUtil.getSortState(_, this.column))
    );
    this.filtered = this.state.pipe(
      map((_) => StateUtil.isColumnFiltered(_, this.column))
    );
    this.iconName = combineLatest([this.sortParam, this.filtered]).pipe(
      map((data: [SortParam, boolean]) => {
        const [sortParam, filtered] = data;
        if (sortParam && filtered) {
          return sortParam.asc ? 'filterSortUpColor' : 'filterSortDownColor';
        }
        if (sortParam) {
          return sortParam.asc ? 'sortUpColor' : 'sortDownColor';
        }
        if (filtered) {
          return 'filterColor';
        }
        return '';
      })
    );
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  resizeStart(event: MouseEvent): void {
    const rect = this._elementRef.nativeElement.getBoundingClientRect();
    this._startPosition = rect.x;
    this._svc.lockPreviousColumns(this.column, this._elementRef.nativeElement);
  }

  resizeProcess(event: MouseEvent): void {
    if (this._startPosition && event.pageX > 0) {
      const position = this._startPosition;
      requestAnimationFrame(() => {
        this._svc.resizeColumn(
          new ColumnResizeEvent(this.column, event.pageX - position)
        );
        this._app.tick();
      });
    }
  }

  resizeEnd() {
    this._startPosition = null;
  }
}
