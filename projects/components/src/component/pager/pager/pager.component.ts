import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'teta-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PagerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
