import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconFileComponent} from './icon-file.component';
import {IconSpriteDirective} from "../icon-sprite.directive";
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    IconFileComponent, IconSpriteDirective],
  exports: [
    IconFileComponent, IconSpriteDirective
  ],
  imports: [
    CommonModule, HttpClientModule
  ]
})
export class IconFileModule {
}
