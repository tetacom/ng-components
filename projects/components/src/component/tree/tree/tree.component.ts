import {
  AfterContentInit,
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
import { ITreeData } from '../../../common/contract/i-tree-data';
import { TreeService } from '../tree.service';
import { TetaTemplateDirective } from '../../../directive/teta-template/teta-template.directive';
import { filter, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'teta-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [TreeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent
  implements OnInit, AfterContentInit, OnChanges, OnDestroy
{
  @Input() data: ITreeData[];
  @Output() service: EventEmitter<TreeService> =
    new EventEmitter<TreeService>();
  @Input() class;
  @Input() padding = 8;
  @Input() childNodeName = 'children';

  @Input()
  set openItems(items: ITreeData[]) {
    this._openItems = items;
    this._service.setOpenItems(items);
  }

  get noChildMode(): boolean {
    const hasChildren = this.data.find(
      (_) => _[this.childNodeName]?.length > 0
    );
    return !hasChildren;
  }

  @Output() openItemsChange = new EventEmitter();

  @ContentChild(TetaTemplateDirective, { static: true })
  template: TetaTemplateDirective;

  private _openItems: ITreeData[];
  private _alive = true;

  constructor(private _service: TreeService, private _cdr: ChangeDetectorRef) {
    this._service.openItems
      .pipe(
        takeWhile((_) => this._alive),
        filter((_) => this._openItems !== _)
      )
      .subscribe((_) => this.openItemsChange.emit(_));
  }

  @Input()
  set compareItems(func: (item: ITreeData) => any) {
    this._service.compareItems = func;
  }

  @HostBinding('class')
  private get getClass(): string {
    const result = [this.class, 'tree'];
    return result.join(' ');
  }

  ngOnInit(): void {
    this.service.emit(this._service);
  }

  ngAfterContentInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this._cdr.detectChanges();
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
