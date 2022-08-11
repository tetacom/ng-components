import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {ITreeData} from '../../../common/contract/i-tree-data';
import {TreeService} from '../tree.service';
import {TetaTemplateDirective} from '../../../directive/teta-template/teta-template.directive';
import {filter, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'teta-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [TreeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  set data(data: ITreeData[]) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  @Input() padding = 8;
  @Input() childNodeName = 'children';
  @Input() virtual: boolean;
  @Input() height = 28;

  @Input()
  set openItems(items: ITreeData[]) {
    this._openItems = items;
    this._service.setOpenItems(items);
  }

  @Output() service: EventEmitter<TreeService> =
    new EventEmitter<TreeService>();
  @Output() openItemsChange = new EventEmitter();

  @ContentChild(TetaTemplateDirective, {static: true})
  template: TetaTemplateDirective;
  childPadding: boolean;
  displayData: ITreeData[];

  private _data: ITreeData[];
  private _openItems: ITreeData[];
  private _alive = true;

  constructor(private _service: TreeService, private _cdr: ChangeDetectorRef) {
    this._service.openItems
      .pipe(
        takeWhile((_) => this._alive),
        filter((_) => this._openItems !== _)
      )
      .subscribe((_) => {
        this._openItems = _;
        this.displayData = this.getDisplayData(this._data, 0);

        this.openItemsChange.emit(_);
      });
  }

  @Input()
  set compareItems(func: (item: ITreeData) => any) {
    this._service.compareItems = func;
  }

  get compareItems() {
    return this._service.compareItems;
  }

  @HostBinding('class.tree') private readonly treeClass = true;

  ngOnInit(): void {
    this.service.emit(this._service);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.displayData = this.getDisplayData(this._data, 0);
    this.childPadding = this.hasChildren(this._data);
    //this._cdr.detectChanges();
  }

  ngOnDestroy() {
    this._alive = false;
  }

  trackRow = (index: number, item: ITreeData): any => {
    if (this.compareItems) {
      return this.compareItems(item);
    }
    return index;
  };


  private hasChildren(data: ITreeData[]): boolean {
    return data.some(
      (_) => _[this.childNodeName]?.length > 0
    );
  }

  private getDisplayData(data: ITreeData[], level: number) {
    const result: ITreeData[] = [];
    data?.forEach((item: ITreeData) => {
      item['level'] = level;
      result.push(item);
      if (item[this.childNodeName]?.length > 0
        && this._openItems?.find((openItem) => this.compareItems(openItem) === this.compareItems(item))) {
        result.push(...this.getDisplayData(item[this.childNodeName], level + 1));
      }
    });
    return result;
  }
}
