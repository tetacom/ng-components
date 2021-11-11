import {Directive, Input, OnInit} from '@angular/core';
import {IconService} from './icon.service';

@Directive({
  selector: '[tetaIconSprite]'
})
export class IconSpriteDirective implements OnInit {
  @Input() tetaIconSprite: string;
  @Input() bypassInterceptors = true;

  constructor(private _iconService: IconService) {
  }

  ngOnInit(): void {
    this._iconService.addSprite(this.tetaIconSprite, this.bypassInterceptors);
  }
}
