import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageSampleComponent} from './message-sample/message-sample.component';
import {ButtonModule} from '../../button/button.module';
import {MessageModule} from '../message.module';
import {IconModule} from '../../icon/icon.module';

@NgModule({
  declarations: [MessageSampleComponent],
  exports: [MessageSampleComponent],
  imports: [
    CommonModule,
    ButtonModule,
    MessageModule,
    IconModule
  ]
})
export class MessageSamplesModule {
}
