import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeSwitchComponent} from './theme-switch/theme-switch.component';
import {ButtonModule} from '../button/button.module';
import {IconModule} from '../icon/icon.module';

@NgModule({
  declarations: [ThemeSwitchComponent],
  exports: [ThemeSwitchComponent],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule
  ]
})
export class ThemeSwitchModule {
}
