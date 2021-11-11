import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'teta-list-item-default',
  templateUrl: './list-item-default.component.html',
  styleUrls: ['./list-item-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemDefaultComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
