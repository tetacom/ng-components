import {Directive, Input, OnInit} from '@angular/core';
import {IconService} from './icon.service';

@Directive({
  selector: '[tetaIconSprite]'
})
export class IconSpriteDirective implements OnInit {
  @Input() tetaIconSprite: string | string[];
  @Input() bypassInterceptors = true;

  constructor(private _iconService: IconService) {
  }

  ngOnInit(): void {
    if (typeof this.tetaIconSprite === 'string') {
      this._iconService.addSprite(this.tetaIconSprite, this.bypassInterceptors);
    }
    if (this.tetaIconSprite instanceof Array && this.tetaIconSprite?.length) {
      this.tetaIconSprite.forEach((sprite: string) => {
        this._iconService.addSprite(sprite, this.bypassInterceptors);
      });
    }
  }
}
