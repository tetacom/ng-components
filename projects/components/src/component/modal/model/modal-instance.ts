import { Observable, Subject } from 'rxjs';
import { IModalResult } from './i-modal-result';
import { ComponentRef } from '@angular/core';
import { TetaContentRef } from '../../../common/contract/teta-content-ref';
import { ModalContainerComponent } from '../modal-container/modal-container.component';

export class ModalInstance {
  onClose: Observable<IModalResult>;
  private _onClose: Subject<IModalResult> = new Subject<IModalResult>();

  constructor(
    private _window: ComponentRef<ModalContainerComponent>,
    private _content: TetaContentRef
  ) {
    this.onClose = this._onClose.asObservable();
    if (this._window && this._window.instance) {
      this._window.instance.closeEvent.subscribe((event: IModalResult) => {
        this.close(event);
      });
    }
  }

  get window(): ComponentRef<ModalContainerComponent> {
    return this._window;
  }

  get component(): ComponentRef<any> | null {
    return this._content.componentRef ? this._content.componentRef : null;
  }

  close = (event?: IModalResult) => {
    this._onClose.next(event);
    this._onClose.complete();
    this.destroy();
  };

  private destroy(): void {
    this._window.destroy();

    if (this._content && this._content.viewRef) {
      this._content.viewRef.destroy();
    }
  }
}
