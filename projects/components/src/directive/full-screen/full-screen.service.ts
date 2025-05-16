import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FullScreenService {
  private active?: Element;

  async enter(el: Element) {
    if (this.active) {
      await this.exit();
    }
    this.active = el;
    await el.requestFullscreen();
  }

  async exit() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    this.active = undefined;
  }

  async toggle(el: Element) {
    if (document.fullscreenElement === el) {
      await this.exit();
    } else {
      await this.enter(el);
    }
  }
}
