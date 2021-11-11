import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'teta-string-item-default',
  templateUrl: './string-item-default.component.html',
  styleUrls: ['./string-item-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StringItemDefaultComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
