import { Component, Input } from '@angular/core';
import { CurrentModal } from '../model/current-modal';
import { ModalCloseReason } from '../model/modal-close-reason.enum';
import { TranslocoModule } from '@jsverse/transloco';
import { IconComponent } from '../../icon/icon/icon.component';
import { ButtonComponent } from '../../button/button/button.component';
import { ToolbarComponent } from '../../toolbar/toolbar/toolbar.component';
import { DialogButtonType } from '../model/dialog-data';

@Component({
  selector: 'teta-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [ToolbarComponent, ButtonComponent, IconComponent, TranslocoModule],
})
export class DialogComponent {
  @Input({ required: true }) title: string;

  private _text: string;
  get text(): string {
    return this._text;
  }
  @Input() set text(value: string) {
    this._text = value || '';
  }

  private _confirm: DialogButtonType;
  get confirm(): DialogButtonType {
    return this._confirm;
  }
  @Input() set confirm(value: DialogButtonType) {
    this._confirm = value || { text: 'common.ok', palette: 'primary' };
  }

  private _decline: null | DialogButtonType;
  get decline(): null | DialogButtonType {
    return this._decline;
  }
  @Input() set decline(value: null | DialogButtonType) {
    this._decline = value !== undefined ? value : { text: 'common.cancel', palette: 'text' };
  }

  constructor(public modal: CurrentModal) {}

  cancel() {
    this.modal.close({
      reason: ModalCloseReason.exit,
    });
  }

  ok() {
    this.modal.close({
      reason: ModalCloseReason.resolve,
    });
  }
}
