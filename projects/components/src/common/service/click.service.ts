import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClickService {
  click: Observable<MouseEvent>;
  contextMenu: Observable<MouseEvent>;

  constructor(@Inject(DOCUMENT) protected _document: any) {
    this.click = fromEvent(this._document, 'click');
    this.contextMenu = fromEvent(this._document, 'contextmenu');
  }
}
