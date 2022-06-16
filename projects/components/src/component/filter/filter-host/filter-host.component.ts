import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import {FilterState} from '../contarct/filter-state';
import {FilterItem} from '../contarct/filter-item';
import {FilterBase} from '../base/filter-base';
import {FilterComponentBase} from '../base/filter-component-base';
import {takeWhile} from 'rxjs/operators';
import {getFilterComponent} from '../contarct/filter-component-map';
import {IIdName} from '../../../common/contract/i-id-name';

@Component({
  selector: 'teta-filter-host',
  template: '',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterHostComponent<T> implements OnInit, OnDestroy {
  @Input()
  set column(val: FilterItem) {
    this._column = val;
    if (this._init) {
      this._componentRef.instance.filterField = this._column;
      this._componentRef.injector.get(ChangeDetectorRef).detectChanges();
    }
  }

  @Input()
  set state(val: FilterState) {
    this._state = val;
    if (this._init) {
      this._componentRef.instance.state = this._state;
      this._componentRef.injector.get(ChangeDetectorRef).detectChanges();
    }
  }

 @Input()
  set data(data: T[]) {
    this._data = data;
    if (this._init) {
      this._componentRef.instance.data = this._data;
      this._componentRef.injector.get(ChangeDetectorRef).detectChanges();
    }
  }

  @Input()
  set filterOptions(val: IIdName<any>[]) {
    this._filterOptions = val;
    if (this._init) {
      this._componentRef.instance.filterOptions = this._filterOptions;
      this._componentRef.injector.get(ChangeDetectorRef).detectChanges();
    }
  }

  @Output() filterChanged: EventEmitter<FilterBase> = new EventEmitter();

  private _alive = true;
  private _column: FilterItem;
  private _state: FilterState;
  private _data: T[];
  private _filterOptions: IIdName<any>[];
  private _componentRef: ComponentRef<any>;
  private _init: boolean;

  constructor(
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    if (!FilterComponentBase.isPrototypeOf(this._column.filterComponent)) {
      this._column.filterComponent = getFilterComponent(this._column);
    }
    this._componentRef =
      this.viewContainerRef.createComponent<FilterComponentBase<T>>(this._column.filterComponent);
    this._componentRef.instance.column = this._column;
    this._componentRef.instance.state = this._state;
    this._componentRef.instance.data = this._data;
    this._componentRef.instance.filterOptions = this._filterOptions;
    this._componentRef.injector.get(ChangeDetectorRef).detectChanges();
    this._init = true;
    this._componentRef.instance.filterChanged
      .pipe(takeWhile((_) => this._alive))
      .subscribe((filter: FilterBase) => {
        this.filterChanged.emit(filter);
      });
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
