import {Component, OnInit} from '@angular/core';
import {DragSortEvent} from '../../drag-sort-event';
import {ArrayUtil} from '../../../../common/util/array-util';
import { DragSortItemDirective } from '../../drag-sort-item.directive';
import { DragSortContainerDirective } from '../../drag-sort-container.directive';

@Component({
    selector: 'teta-drag-sort-demo',
    templateUrl: './drag-sort-demo.component.html',
    styleUrls: ['./drag-sort-demo.component.scss'],
    standalone: true,
    imports: [DragSortContainerDirective, DragSortItemDirective]
})
export class DragSortDemoComponent implements OnInit {
  items = [
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
  ];
  items2 = [
    {
      id: 10,
      name: 10,
    },
    {
      id: 11,
      name: 11,
    },
    {
      id: 12,
      name: 12,
    },
    {
      id: 13,
      name: 13,
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  update(event: DragSortEvent<any>, list: any[]) {
    return ArrayUtil.moveItem(list, event.previousIndex, event.newIndex);
  }
}
