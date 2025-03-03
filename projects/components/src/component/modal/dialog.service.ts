import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';
import { Observable } from 'rxjs';
import { IModalResult } from './model/i-modal-result';
import { DialogComponent } from './dialog/dialog.component';
import { map } from 'rxjs/operators';
import { ModalCloseReason } from './model/modal-close-reason.enum';
import { DialogDataType } from './model/dialog-data';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private _modal: ModalService) {}

  alert(title: string): void {
    this.createDialog({ title, decline: null });
  }

  confirm(confirmDialogData: DialogDataType): Observable<boolean> {
    return this.createDialog(confirmDialogData).pipe(
      map((result: IModalResult) => result.reason === ModalCloseReason.resolve),
    );
  }

  private createDialog(dialogData: DialogDataType): Observable<IModalResult> {
    const { title, text, confirm, decline } = dialogData;

    const dialog = this._modal.create(
      DialogComponent,
      {
        title,
        text,
        confirm,
        decline,
      },
      {
        esc: true,
        backdrop: true,
      },
    );
    return dialog.onClose;
  }
}
