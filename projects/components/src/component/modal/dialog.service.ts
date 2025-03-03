import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';
import { Observable } from 'rxjs';
import { IModalResult } from './model/i-modal-result';
import { DialogComponent } from './dialog/dialog.component';
import { map } from 'rxjs/operators';
import { ModalCloseReason } from './model/modal-close-reason.enum';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private _modal: ModalService) {}

  alert(message: string): void {
    this.createDialog(message, 'common.ok', null, 'primary', false);
  }

  confirm(
    message: string,
    buttonText = 'common.ok',
    buttonIcon: string = null,
    buttonPalette = 'primary',
    cancelButtonText = 'common.cancel',
    cancelButtonIcon: string = null,
    cancelButtonPalette = 'text',
  ): Observable<boolean> {
    return this.createDialog(
      message,
      buttonText,
      buttonIcon,
      buttonPalette,
      true,
      cancelButtonText,
      cancelButtonIcon,
      cancelButtonPalette,
    ).pipe(map((result: IModalResult) => result.reason === ModalCloseReason.resolve));
  }

  private createDialog(
    message: string,
    buttonText = 'common.ok',
    buttonIcon: string = null,
    buttonPalette = 'primary',
    showCancelButton = true,
    cancelButtonText = 'common.cancel',
    cancelButtonIcon: string = null,
    cancelButtonPalette = 'text',
  ): Observable<IModalResult> {
    const dialog = this._modal.create(
      DialogComponent,
      {
        message,
        buttonText,
        buttonIcon,
        buttonPalette,
        showCancelButton,
        cancelButtonText,
        cancelButtonIcon,
        cancelButtonPalette,
      },
      {
        esc: true,
        backdrop: true,
      },
    );
    return dialog.onClose;
  }
}
