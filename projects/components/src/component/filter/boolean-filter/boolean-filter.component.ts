import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {FilterComponentBase} from '../base/filter-component-base';
import {FilterItem} from '../contarct/filter-item';
import {IIdName} from '../../../common/contract/i-id-name';
import {FilterBase} from '../base/filter-base';
import {FilterState} from '../contarct/filter-state';
import {BooleanFilter} from '../contarct/boolean-filter';
import {TetaConfigService} from "../../../locale/teta-config.service";
import {Observable} from "rxjs";
import {TetaLocalisation} from "../../../locale/teta-localisation";
import { AsyncPipe } from '@angular/common';
import { RadioButtonComponent } from '../../radio/radio-button/radio-button.component';
import { FormsModule } from '@angular/forms';
import { RadioComponent } from '../../radio/radio/radio.component';

@Component({
    selector: 'teta-boolean-filter',
    templateUrl: './boolean-filter.component.html',
    styleUrls: ['./boolean-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RadioComponent,
        FormsModule,
        RadioButtonComponent,
        AsyncPipe,
    ],
})
export class BooleanFilterComponent<T>
  extends FilterComponentBase<T>
  implements OnInit {
  @Input() column: FilterItem;
  @Input() data: T[];
  @Input() filterOptions: IIdName<any>[] = [];
  @Output() filterChanged: EventEmitter<FilterBase<boolean>> =
    new EventEmitter<FilterBase<boolean>>();

  filter: BooleanFilter;
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

  constructor(private changeDetector: ChangeDetectorRef, private _config: TetaConfigService) {
    super();
    this.locale = this._config.locale;
  }

  ngOnInit() {
  }

  setFilter() {
    this.filterChanged.emit(this.filter);
  }

  private getFilter(): BooleanFilter {
    let filter = this.state.booleanFilters.find(
      (f) => f.field === this.column.filterField
    );
    if (!filter) {
      filter = this.state.addBooleanFilter(
        new BooleanFilter({
          value: null,
          field: this.column.filterField,
          name: this.column.name,
        })
      );
    }
    return filter;
  }
}
