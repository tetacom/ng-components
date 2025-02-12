import { ChangeDetectionStrategy, Component, computed, inject, input, Signal } from '@angular/core';
import { TreeService } from '../tree.service';
import { ITreeData } from '../../../common/contract/i-tree-data';
import { IconComponent } from '../../icon/icon/icon.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'teta-tree-item-toggle',
  templateUrl: './tree-item-toggle.component.html',
  styleUrls: ['./tree-item-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class TreeItemToggleComponent {
  treeService = inject(TreeService);
  item = input<ITreeData>();
  open: Signal<boolean>;

  openItems: Signal<ITreeData[]>;

  constructor() {
    this.openItems = toSignal(this.treeService.openItems);
    this.open = computed(() => {
      const found = this.openItems()?.find(
        (x) => this.treeService.compareItems(x) === this.treeService.compareItems(this.item()),
      );
      return !!found;
    });
  }
}
