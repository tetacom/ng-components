import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  input,
  Signal,
  TemplateRef,
} from '@angular/core';
import { ITreeData } from '../../../common/contract/i-tree-data';
import { TreeService } from '../tree.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * TODO: Lazy загрузка дочерних элементов, Output onExpand, шаблон для иконки expand
 */
@Component({
  selector: 'teta-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('treeItemInstance', [
      transition('void => *', [style({ opacity: '0' }), animate(200, style({ opacity: '1' }))]),
      // transition('* => void', [animate(200, style({opacity: '0'}))]),
    ]),
  ],
  imports: [NgClass, NgTemplateOutlet],
})
export class TreeItemComponent {
  treeService = inject(TreeService);

  item = input<ITreeData>();
  depth = input<number>(0);
  padding = input<number>(16);
  childNodeName = input<string>('children');
  template = input<TemplateRef<any>>();
  childPadding = input<boolean>();
  openItems: Signal<ITreeData[]>;
  @HostBinding('class.tree__item-container') private readonly treeItemClass = true;

  itemIsOpen: Signal<boolean>;

  @HostBinding('@treeItemInstance') private readonly treeItemInstance = true;

  computedDepth = computed(() => {
    return this.depth() + (this.item()[this.childNodeName()]?.length > 0 ? 0 : this.childPadding() ? 2 : 1);
  });

  constructor() {
    this.openItems = toSignal(this.treeService.openItems);
    this.itemIsOpen = computed(() => {
      const found = this.openItems()?.find(
        (x) => this.treeService.compareItems(x) === this.treeService.compareItems(this.item()),
      );
      return !!found;
    });
  }

  openItem() {
    this.treeService.openItem(this.item());
  }
}
