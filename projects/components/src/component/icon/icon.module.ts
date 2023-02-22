import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconFileComponent} from './icon-file/icon-file.component';
import {IconSpriteDirective} from './icon-sprite.directive';
import {HttpClientModule} from '@angular/common/http';
import {IconComponent} from "./icon/icon.component";

@NgModule({
  declarations: [
    IconComponent,
    IconFileComponent,
    IconSpriteDirective
  ],
  exports: [
    IconComponent,
    IconFileComponent,
    IconSpriteDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class IconModule {
}
