import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'teta-numeric-item-default',
  templateUrl: './numeric-item-default.component.html',
  styleUrls: ['./numeric-item-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumericItemDefaultComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
