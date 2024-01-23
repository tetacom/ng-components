import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';

@Component({
    selector: 'teta-form-group-title',
    templateUrl: './form-group-title.component.html',
    styleUrls: ['./form-group-title.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FormGroupTitleComponent implements OnInit {
  @HostBinding('class.form-group-title') private readonly className = true;

  constructor() {}

  ngOnInit(): void {}
}
