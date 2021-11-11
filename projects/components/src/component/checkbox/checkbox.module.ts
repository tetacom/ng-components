import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {IconModule} from '../icon/icon.module';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    CheckboxComponent
  ]
})
export class CheckboxModule {
}
