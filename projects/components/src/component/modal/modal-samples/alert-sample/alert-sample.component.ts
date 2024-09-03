import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../dialog.service';
import { ButtonComponent } from '../../../button/button/button.component';
import { IconSpriteDirective } from '../../../icon/icon-sprite.directive';

@Component({
  selector: 'teta-alert-sample',
  templateUrl: './alert-sample.component.html',
  styleUrls: ['./alert-sample.component.scss'],
  standalone: true,
  imports: [IconSpriteDirective, ButtonComponent],
})
export class AlertSampleComponent implements OnInit {
  constructor(private _dialog: DialogService) {}

  alert() {
    this._dialog.alert('Some alert text');
  }

  dialog() {
    this._dialog.confirm('Some alert text').subscribe((_) => {
      alert(_.toString());
    });
  }

  dialog2() {
    this._dialog.confirm('Some alert text', 'Edit', 'edit', 'red').subscribe((_) => {
      alert(_.toString());
    });
  }

  ngOnInit(): void {}
}
