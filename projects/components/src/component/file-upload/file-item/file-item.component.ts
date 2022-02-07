import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'teta-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
