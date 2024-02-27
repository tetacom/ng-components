import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { DialogComponent } from './dialog/dialog.component';


import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';


@NgModule({
    exports: [ModalContainerComponent, DialogComponent],
    imports: [
    CommonModule,
    TranslocoModule,
    ModalContainerComponent, DialogComponent,
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
