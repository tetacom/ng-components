import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DragSortEvent } from '../../../drag-sort/drag-sort-event';
import { ArrayUtil } from '../../../../common/util/array-util';
import { JsonPipe } from '@angular/common';
import { DragPreviewDirective } from '../../drag-preview.directive';
import { DragDirective } from '../../drag.directive';
import { DragContainerDirective } from '../../drag-container.directive';

@Component({
  selector: 'teta-drag-drop-demo',
  templateUrl: './drag-drop-demo.component.html',
  styleUrls: ['./drag-drop-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DragContainerDirective, DragDirective, DragPreviewDirective, JsonPipe],
})
export class DragDropDemoComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}

  start() {
    return true;
  }

  update(event: DragSortEvent<any>, list: any[]) {
    return ArrayUtil.moveItem(list, event.previousIndex, event.newIndex);
  }

  log(data) {
    console.log(data);
  }

  allowDropPredicate(selection, data) {
    console.log(selection, data);
    return data.id % 2 === 0;
  }
}
