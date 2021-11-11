import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ITreeData } from '../../../common/contract/i-tree-data';
import { TreeService } from '../tree.service';
import { takeWhile } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';

/**
 * TODO: Lazy загрузка дочерних элементов, Output onExpand, шаблон для иконки expand
 */
@Component({
  selector: 'teta-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('children', [
      transition('void => *', [
        style({ opacity: '0' }),
        animate(200, style({ opacity: '1' })),
      ]),
      transition('* => void', [animate(200, style({ opacity: '0' }))]),
    ]),
  ],
})
export class TreeItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item: ITreeData;
  @Input() depth = 0;
  @Input() padding = 16;
  @Input() childNodeName = 'children';
  @Input() template: TemplateRef<any>;
  @Input() noChildMode: boolean;

  @HostBinding('class.tree__item-container') private readonly treeItemClass =
    true;

  itemIsOpen = false;

  private _alive = true;

  get computedDepth(): number {
    return (
      this.depth +
      (this.item[this.childNodeName]?.length > 0 ? 0 : this.noChildMode ? 1 : 2)
    );
  }

  constructor(public service: TreeService, private _cdr: ChangeDetectorRef) {}

  openItem() {
    this.service.openItem(this.item);
  }

  ngOnInit(): void {
    this.service.openItems
      .pipe(takeWhile((_) => this._alive))
      .subscribe((_) => {
        const found = _?.find(
          (x) =>
            this.service.compareItems(x) ===
            this.service.compareItems(this.item)
        );
        this.itemIsOpen = found != null;
        this._cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this._alive = false;
  }
}
