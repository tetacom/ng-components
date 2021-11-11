import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { DialogComponent } from './dialog/dialog.component';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { ButtonModule } from '../button/button.module';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [ModalContainerComponent, DialogComponent],
  exports: [ModalContainerComponent, DialogComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    TranslocoModule,
    IconModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'common', alias: 'common' },
      multi: true,
    },
  ],
})
export class ModalModule {}
