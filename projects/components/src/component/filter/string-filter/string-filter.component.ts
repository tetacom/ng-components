import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {StringFilter} from '../contarct/string-filter';
import {FilterState} from '../contarct/filter-state';
import {FilterBase} from '../base/filter-base';
import {FilterComponentBase} from '../base/filter-component-base';
import {FilterItem} from '../contarct/filter-item';
import {IIdName} from '../../../common/contract/i-id-name';
import {TetaConfigService} from '../../../locale/teta-config.service';
import {Observable} from 'rxjs';
import {TetaLocalisation} from '../../../locale/teta-localisation';

@Component({
  selector: 'teta-string-filter',
  templateUrl: './string-filter.component.html',
  styleUrls: ['./string-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StringFilterComponent<T>
  extends FilterComponentBase<T>
  implements OnInit {
  @Input() column: FilterItem;
  @Input() data: T[];
  @Input() filterOptions: IIdName<any>[] = [];
  @Output() filterChanged: EventEmitter<FilterBase<string>> =
    new EventEmitter<FilterBase<string>>();

  filter: StringFilter;
  state$: FilterState;

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
    this.filter = this.getFilter();
    this.changeDetector.detectChanges();
  }

  get state() {
    return this.state$;
  }
  locale: Observable<TetaLocalisation>;

  constructor(private changeDetector: ChangeDetectorRef,
              private _config: TetaConfigService) {
    super();
    this.locale = this._config.locale;
  }

  ngOnInit() {
  }

  setFilter() {
    this.filterChanged.emit(this.filter);
  }

  private getFilter(): StringFilter {
    let filter = this.state.stringFilters.find(
      (f) => f.field === this.column.filterField
    );
    if (!filter) {
      filter = this.state.addStringFilter(
        new StringFilter({
          value: '',
          field: this.column.filterField,
          type: this.column.stringFilterType,
          name: this.column.name,
        })
      );
    }
    filter.type = this.column.stringFilterType;
    return filter;
  }
}
