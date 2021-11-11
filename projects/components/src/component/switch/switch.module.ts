import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwitchComponent} from './switch/switch.component';
import {SwitchButtonComponent} from './switch-button/switch-button.component';


@NgModule({
  declarations: [SwitchComponent, SwitchButtonComponent],
  exports: [SwitchComponent, SwitchButtonComponent],
  imports: [
    CommonModule
  ]
})
export class SwitchModule {
}
