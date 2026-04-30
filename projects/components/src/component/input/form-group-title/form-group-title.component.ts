import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'teta-form-group-title',
  templateUrl: './form-group-title.component.html',
  styleUrls: ['./form-group-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FormGroupTitleComponent {
  @HostBinding('class.form-group-title') readonly className = true;
}
