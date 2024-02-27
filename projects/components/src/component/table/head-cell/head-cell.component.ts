import {
  ApplicationRef,
  ChangeDetectionStrategy, ChangeDetectorRef,
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
import { VisibilityDropdownTabComponent } from '../table-head/visibility-dropdown-tab/visibility-dropdown-tab.component';
import { FilterDropdownTabComponent } from '../table-head/filter-dropdown-tab/filter-dropdown-tab.component';
import { MainDropdownTabComponent } from '../table-head/main-dropdown-tab/main-dropdown-tab.component';
import { ResizeDragDirective } from '../../../directive/resize-drag/resize-drag.directive';
import { DropdownContentDirective } from '../../dropdown/dropdown-content.directive';
import { HeadCellDropdownComponent } from '../head-cell-dropdown/head-cell-dropdown.component';
import { IconComponent } from '../../icon/icon/icon.component';
import { HeadCellHostComponent } from '../head-cell-host/head-cell-host.component';
import { NgClass, AsyncPipe } from '@angular/common';
import { DropdownHeadDirective } from '../../dropdown/dropdown-head.directive';
import { DropdownComponent } from '../../dropdown/dropdown/dropdown.component';

@Component({
    selector: 'teta-head-cell',
    templateUrl: './head-cell.component.html',
    styleUrls: ['./head-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DropdownComponent,
        DropdownHeadDirective,
        NgClass,
        HeadCellHostComponent,
        IconComponent,
        HeadCellDropdownComponent,
        DropdownContentDirective,
        ResizeDragDirective,
        MainDropdownTabComponent,
        FilterDropdownTabComponent,
        VisibilityDropdownTabComponent,
        AsyncPipe,
    ],
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
  dropDownOpen = false;
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

  get elementRef() {
    return this._elementRef;
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

  private observer: IntersectionObserver;

  constructor(
    private _svc: TableService<T>,
    private _app: ApplicationRef,
    private _elementRef: ElementRef,
    private _cdr: ChangeDetectorRef
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

    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && this.dropDownOpen) {
          this.dropDownOpen = false;
          this._cdr.detectChanges();
        }
      });
    }, {
      root: this._svc.getTableElement(this._elementRef.nativeElement),
      threshold: [1]
    });
    this.observer.observe(this._elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this._alive = false;
    this.observer.unobserve(this._elementRef.nativeElement);
    this.observer.disconnect();
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
