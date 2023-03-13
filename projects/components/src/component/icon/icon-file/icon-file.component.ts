import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'teta-icon-file',
  templateUrl: './icon-file.component.html',
  styleUrls: ['./icon-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconFileComponent {
  @Input() extension: 'csv' | 'doc' | 'pdf' | 'txt' | 'las' | 'xls' | 'jpeg' | 'jpg' | 'png';
}
