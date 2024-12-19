import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NumericFilter } from '../contarct/numeric-filter';
import { FilterComponentBase } from '../base/filter-component-base';
import { FilterBase } from '../base/filter-base';
import { FilterState } from '../contarct/filter-state';
import { FilterItem } from '../contarct/filter-item';
import { NumericFilterValue } from '../contarct/numeric-filter-value';
import { IIdName } from '../../../common/contract/i-id-name';
import { TetaConfigService } from '../../../locale/teta-config.service';
import { Observable } from 'rxjs';
import { TetaLocalisation } from '../../../locale/teta-localisation';
import { AsyncPipe } from '@angular/common';
import { OnlyNumberDirective } from '../../../directive/only-number/only-number.directive';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../input/input/input.component';

@Component({
    selector: 'teta-numeric-filter',
    templateUrl: './numeric-filter.component.html',
    styleUrls: ['./numeric-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InputComponent, FormsModule, OnlyNumberDirective, AsyncPipe]
})
export class NumericFilterComponent<T> extends FilterComponentBase<T> implements OnInit {
  @Input() column: FilterItem;
  @Input() data: T[];
  @Input() filterOptions: IIdName<any>[] = [];
  @Output() filterChanged: EventEmitter<FilterBase<NumericFilterValue>> = new EventEmitter<
    FilterBase<NumericFilterValue>
  >();

  filter: NumericFilter;

  private state$: FilterState;

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

  constructor(
    private changeDetector: ChangeDetectorRef,
    private _config: TetaConfigService,
  ) {
    super();
    this.locale = this._config.locale;
  }

  ngOnInit() {
    this.filter = this.getFilter();
  }

  private getFilter(): NumericFilter {
    let filter = this.state.numericFilters?.find((f) => f.field === this.column.filterField);
    if (filter === null || filter === undefined) {
      filter = this.state.addNumericFilter(
        new NumericFilter({
          value: new NumericFilterValue(),
          field: this.column.filterField,
          name: this.column.name,
          strict: true,
        }),
      );
    }
    return filter;
  }
}
