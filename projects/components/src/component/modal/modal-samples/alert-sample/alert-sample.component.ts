import { Component } from '@angular/core';
import { DialogService } from '../../dialog.service';
import { ButtonComponent } from '../../../button/button/button.component';
import { IconSpriteDirective } from '../../../icon/icon-sprite.directive';

@Component({
  selector: 'teta-alert-sample',
  templateUrl: './alert-sample.component.html',
  styleUrls: ['./alert-sample.component.scss'],
  imports: [IconSpriteDirective, ButtonComponent],
})
export class AlertSampleComponent {
  constructor(private _dialog: DialogService) {}

  alert() {
    this._dialog.alert('Some alert text');
  }

  dialog() {
    this._dialog.confirm({ title: 'Some alert text' }).subscribe((_) => {
      alert(_.toString());
    });
  }

  dialog2() {
    this._dialog
      .confirm({
        title: 'Some alert text',
        text: 'Some description text',
        confirm: { text: 'Edit', palette: 'red', icon: 'edit' },
        decline: { text: 'Cancel', icon: 'closeBig' },
      })
      .subscribe((_) => {
        alert(_.toString());
      });
  }
}
