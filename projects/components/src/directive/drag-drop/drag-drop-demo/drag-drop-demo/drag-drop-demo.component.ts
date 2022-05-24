import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DragSortEvent} from '../../../drag-sort/drag-sort-event';
import {ArrayUtil} from '../../../../common/util/array-util';

@Component({
  selector: 'teta-drag-drop-demo',
  templateUrl: './drag-drop-demo.component.html',
  styleUrls: ['./drag-drop-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  constructor() {
  }

  ngOnInit(): void {
  }

  start() {
    return true;
  }

  update(event: DragSortEvent<any>, list: any[]) {
    return ArrayUtil.moveItem(list, event.previousIndex, event.newIndex);
  }

  log(data) {
    console.log(data);
  }
}
