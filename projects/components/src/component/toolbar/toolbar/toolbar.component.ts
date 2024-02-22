import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

@Component({
    selector: 'teta-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class ToolbarComponent implements OnInit {
  @Input() palette: string;
  @Input() class;

  @HostBinding('class')
  private get getClass() {
    const result = [this.class, 'toolbar'];
    if (this.palette) {
      result.push(`toolbar-${this.palette}`);
    }
    return result.join(' ');
  }

  ngOnInit(): void {}
}
