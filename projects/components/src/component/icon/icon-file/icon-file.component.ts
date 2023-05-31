import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'teta-icon-file',
  templateUrl: './icon-file.component.html',
  styleUrls: ['./icon-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconFileComponent implements OnInit {
  @Input() name: string;
  @Input() class;

  @HostBinding('class')
  private get getClass(): string {
    const result = [this.class, 'icon icon-file'];
    return result.join(' ');
  }

  constructor() { }

  ngOnInit(): void {
  }

  getName(): string {
    return `#${this.name}`;
  }
}
