import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'teta-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanelComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
