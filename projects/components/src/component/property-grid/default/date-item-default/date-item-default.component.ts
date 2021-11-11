import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'teta-date-item-default',
  templateUrl: './date-item-default.component.html',
  styleUrls: ['./date-item-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateItemDefaultComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
