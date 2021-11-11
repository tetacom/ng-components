import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageHostComponent} from './message-host/message-host.component';
import {MessageComponent} from './message/message.component';
import {IconModule} from '../icon/icon.module';
import {ButtonModule} from '../button/button.module';

@NgModule({
  declarations: [MessageHostComponent, MessageComponent],
  exports: [MessageHostComponent, MessageComponent],
  imports: [
    CommonModule,
    IconModule,
    ButtonModule
  ]
})
export class MessageModule {
}
