import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconSpriteDirective} from './icon-sprite.directive';
import {HttpClientModule} from '@angular/common/http';
import {IconComponent} from "./icon/icon.component";
import {IconFileComponent} from "./icon-file/icon-file.component";


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
