import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFromComponentComponent } from './modal-from-component/modal-from-component.component';
import { ModalFromTemplateComponent } from './modal-from-template/modal-from-template.component';
import { FormsModule } from '@angular/forms';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { ModalContainerComponent } from '../modal-container/modal-container.component';
import { ModalModule } from '../modal.module';
import { ToolbarModule } from '../../toolbar/toolbar.module';
import { ButtonModule } from '../../button/button.module';
import { IconModule } from '../../icon/icon.module';
import { AlertSampleComponent } from './alert-sample/alert-sample.component';
import { DialogComponent } from '../dialog/dialog.component';

@NgModule({
    declarations: [
        ModalFromComponentComponent,
        ModalFromTemplateComponent,
        ModalExampleComponent,
        AlertSampleComponent,
    ],
    exports: [
        ModalFromComponentComponent,
        ModalFromTemplateComponent,
        ModalExampleComponent,
        AlertSampleComponent,
    ],
    imports: [
        CommonModule,
        ModalModule,
        ButtonModule,
        ToolbarModule,
        FormsModule,
        IconModule,
    ]
})
export class ModalSamplesModule {}
