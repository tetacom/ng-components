import { Meta } from '@storybook/angular/types-6-0';
import { withKnobs } from '@storybook/addon-knobs';
import { DragSortModule } from './drag-sort.module';
import { DragSortEvent } from './drag-sort-event';
import { ArrayUtil } from '../../common/util/array-util';

export default {
  title: 'Directive/DragSort',
  decorators: [withKnobs],
} as Meta;

export const dragSort = () => ({
  moduleMetadata: {
    imports: [DragSortModule],
  },
  props: {
    items: [
      {
        id: 0,
        name: 0,
      },
      {
        id: 1,
        name: 1,
      },
      {
        id: 2,
        name: 2,
      },
      {
        id: 3,
        name: 3,
      },
    ],
    update: (event: DragSortEvent<any>, list: any[]) => {
      return ArrayUtil.moveItem(list, event.previousIndex, event.newIndex);
    },
  },
  template: `<div tetaDragSortContainer
                  (dragSorted)="items = update($event, items)"
                  [dragSortList]="items"
                  class="padding-10 margin-10 row row_auto border border-text-5">
              <div [tetaDragSortItem]="item"
                    *ngFor="let item of items"
                    class="padding-4 border border-text-10">
                {{item.name}}
              </div>
            </div>
            <div tetaDragSortContainer
                  (dragSorted)="items = update($event, items)"
                  [dragSortList]="items"
                  class="padding-10 margin-10 column row_auto border border-text-5">
              <div [tetaDragSortItem]="item"
                    [dragSortDirection]="'vertical'"
                    *ngFor="let item of items"
                    class="padding-4 border border-text-10">
                {{item.name}}
              </div>
            </div>`,
});
