import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'teta-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  @Input() label: string;

  @Input()
  @HostBinding('class.row')
  horizontal: boolean;

  @Input()
  required = false;

  @HostBinding('class.column')
  get column() {
    return !this.horizontal;
  }

  constructor() {}

  ngOnInit(): void {}
}
