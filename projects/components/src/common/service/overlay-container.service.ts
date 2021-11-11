import {Inject, Injectable, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OverlayContainerService implements OnDestroy {
  private _containerClass = 'overlay-container';
  private _container: HTMLElement;

  constructor(@Inject(DOCUMENT) private document$: any) {
  }

  getContainer(): HTMLElement {
    if (!this._container) {
      this.createContainer();
    }
    return this._container;
  }

  private createContainer(): void {
    const container = this.document$.createElement('div');
    container.classList.add(this._containerClass);
    this.document$.body.appendChild(container);
    this._container = container;
  }

  private removeContainer(): void {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
  }

  ngOnDestroy(): void {
    this.removeContainer();
  }
}
