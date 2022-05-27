import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import {TableColumn} from '../../contract/table-column';
import {FilterState} from '../../../filter/contarct/filter-state';
import {Observable} from 'rxjs';
import {TetaLocalisation} from '../../../../locale/teta-localisation';
import {TableService} from '../../service/table.service';
import {TetaConfigService} from '../../../../locale/teta-config.service';
import {TableRow} from '../../contract/table-row';
import {IDictionary} from '../../../../common/contract/i-dictionary';
import {IIdName} from '../../../../common/contract/i-id-name';
import {ITreeData} from '../../../../common/contract/i-tree-data';

@Component({
  selector: 'teta-filter-dropdown-tab',
  templateUrl: './filter-dropdown-tab.component.html',
  styleUrls: ['./filter-dropdown-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterDropdownTabComponent<T> implements OnInit {
  @Input() columns: ITreeData[];
  @Input() column: TableColumn;
  @Input() state: FilterState;
  @Input() data: TableRow<T>[];
  @Input() close: () => void;

  locale: Observable<TetaLocalisation>;
  filterOptions: Observable<IDictionary<IIdName<any>[]>>;

  @HostListener('keydown.enter') enter() {
    this.applyFilter();
  }

  constructor(private _svc: TableService<T>,
              private _config: TetaConfigService,
              private _elementRef: ElementRef,
              private _cdr: ChangeDetectorRef) {
    this.locale = this._config.locale;
    this.filterOptions = this._svc.filterOptions;
  }

  clearFilter() {
    this._svc.clearFilter(this.column);
    this.close();
    this._cdr.markForCheck();
  }

  applyFilter() {
    this._svc.setState(new FilterState(this.state));
    this.close();
    this._cdr.markForCheck();
  }

  ngOnInit(): void {
  }
}
