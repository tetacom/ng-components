import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconComponent} from './icon/icon.component';
import {IconSpriteDirective} from './icon-sprite.directive';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    IconComponent,
    IconSpriteDirective
  ],
  exports: [
    IconComponent,
    IconSpriteDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class IconModule {
}
